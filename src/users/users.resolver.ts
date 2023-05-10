import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((type) => [User])
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((type) => CreateUserOutput)
  createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }
}
