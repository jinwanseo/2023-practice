import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['email', 'password', 'role'] as const),
) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
