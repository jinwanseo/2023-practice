import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class LoginUserInput extends PickType(User, [
  'email',
  'password',
] as const) {}

@ObjectType()
export class LoginUserOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
