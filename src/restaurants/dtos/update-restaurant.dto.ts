import { CreateRestaurantDto } from './create-restaurant.dto';

import { InputType, PartialType, ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsObject, IsString } from 'class-validator';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

/**
 * @title 아래와 같이 Update Dto 는 여러 타입을 조합해서 만들수 있음.
 * @description [조심 🔥] DTO는 이번 버전부터 무조건 class-validator가 포함되어있어야함..
 */
@ArgsType()
export class UpdateRestaurantDto {
  @IsNumber()
  @Field((type) => Number)
  id: number;

  @IsObject()
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
