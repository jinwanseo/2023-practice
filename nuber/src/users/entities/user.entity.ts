import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}
registerEnumType(UserRole, { name: 'UserRole' });

@Entity()
@InputType('UserType', { isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  @IsEmail()
  @Column({ unique: true })
  @Field((type) => String)
  email: string;

  @IsBoolean()
  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  isVerified: boolean;

  @IsString()
  @Column({ select: false })
  @Field((type) => String)
  password: string;

  @IsEnum(UserRole)
  @Column({ enum: UserRole, type: 'enum' })
  @Field((type) => UserRole)
  role: UserRole;

  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  restaurants: Restaurant[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, this.password);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
