import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ChatModule } from './chat/chat.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Message } from './chat/message.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      introspection: true,
      playground: true,
    }),
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-square-hat-55812065.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'Udit-Kapoor',
      password: 'teOR4cV9EIxd',
      database: 'neondb',
      entities: [Message],
      ssl: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
