import { Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

export class Category extends CoreEntity {
  @IsString()
  @Column({ unique: true })
  @Field((type) => String)
  name: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  @Field((type) => String)
  coverImg?: string;

  @IsString()
  @Column({ unique: true })
  @Field((type) => String)
  slug: string;

  @Field((type) => [Restaurant], { nullable: true })
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurants: Restaurant[];
}
