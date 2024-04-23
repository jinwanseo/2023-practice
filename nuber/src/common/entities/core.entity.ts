import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class CoreEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @IsDate()
  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;

  @IsDate()
  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;
}
