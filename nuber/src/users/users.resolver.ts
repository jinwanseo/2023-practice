import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dtos/update-user.dto';
import { LoginUserInput, LoginUserOutput } from './dtos/login-user.dto';
import { ReadUserOutput } from './dtos/read-user.dto';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth.decorator';

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

  @Role(['Any'])
  @Mutation((type) => UpdateUserOutput)
  updateUser(
    @AuthUser() user: User,
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.userService.updateUser(user, updateUserInput);
  }

  @Mutation((type) => LoginUserOutput)
  loginUser(
    @Args('input') loginUserInput: LoginUserInput,
  ): Promise<LoginUserOutput> {
    return this.userService.loginUser(loginUserInput);
  }

  @Role(['Any'])
  @Query((type) => ReadUserOutput)
  async me(@AuthUser() user: User): Promise<ReadUserOutput> {
    return {
      ok: true,
      result: user,
    };
  }
}
