import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'; // Import ObjectType and Field

@Entity()
@ObjectType() // Add this decorator
export class Message {
  @PrimaryGeneratedColumn()
  @Field() // Add this decorator
  id: number;

  @Column()
  @Field() // Add this decorator
  content: string;

  @Column()
  @Field() // Add this decorator
  sender: string;

  @Column()
  @Field() // Add this decorator
  timestamp: string;
}
