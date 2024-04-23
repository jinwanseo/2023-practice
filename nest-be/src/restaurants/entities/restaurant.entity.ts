import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// InputType({isAbscract: true}) : DTO에서 상속 받아 쓰기 위한 데코레이터
// ObjectType : Graphql 모델 스키마
// Entity : TypeOrm 모델 스키마

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  // Field : Graphql 반환 타입
  // PrimaryGeneratedColumn, Column : TypeOrm
  // 그외 Validation (DTO)
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsBoolean()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;

  @Field(() => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field(() => String)
  @Column()
  @IsString()
  category: string;
}
