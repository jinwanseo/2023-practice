import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Category } from './category.entity';

@InputType('restaurantType', { isAbstract: true })
@Entity()
@ObjectType()
export class Restaurant extends CoreEntity {
  @IsString()
  @Column({ unique: true })
  @Field((type) => String)
  name: string;

  @IsString()
  @Column()
  @Field((type) => String)
  address: string;

  @IsString()
  @Column()
  @Field((type) => String)
  coverImg: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((self: Restaurant) => self.owner)
  ownerId: number;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;
}
