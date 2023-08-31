import { Resolver, Query, Mutation, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  @Query(() => [Message])
  async getMessages() {
    return this.messageRepository.find();
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('content') content: string,
    @Args('sender') sender: string,
  ) {
    const timestamp = new Date().toISOString();
    const message = { content, sender, timestamp };
    const savedMessage = await this.messageRepository.save(message) as Message;
    pubSub.publish('messageSent', { messageSent: savedMessage });
    console.log('recieved and saved from server' , savedMessage);
    return savedMessage;
  }

  @Subscription(() => Message, {
    resolve: (value) => value.messageSent,
  })
  messageSent() {
    return pubSub.asyncIterator('messageSent');
  }
}
