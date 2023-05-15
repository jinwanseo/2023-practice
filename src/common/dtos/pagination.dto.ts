import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @IsNumber()
  @Field((type) => Number)
  page: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  totalPages?: number;

  @Field((type) => Number, { nullable: true })
  total?: number;
}
