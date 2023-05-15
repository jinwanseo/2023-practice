import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class ReadRestaurantInput {
  @IsNumber()
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class ReadRestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  result?: Restaurant;
}
