import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from 'src/common/dtos/create-account.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query((types) => [User])
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Mutation((types) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    await this.userService.createAccount(createAccountInput);
    return {
      ok: true,
    };
  }
}
