import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class ReadUserOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  result?: User;
}
