import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

// @InputType()
// Object 그자체의 타입 검사
// resolver 함수 내에서 @Args(파라미터 이름) 적어줘야함
//@ArgsType()
// Parameter 타입 정의 (Object 전체가 아닌 개별 요소 검증)
// resolver 함수 내에서 @Args() 비워 줘야함

// 주의 🔥 DTO는 꼭 class Validator 가 들어가야함
// @ArgsType()
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id'] as const) {
  @IsString()
  @Field(() => String)
  @Length(5, 10)
  name: string;
  @IsBoolean()
  @Field(() => Boolean)
  isVegan: boolean;
  @IsString()
  @Field(() => String)
  address: string;
  @IsString()
  @Field(() => String)
  ownerName: string;
}
