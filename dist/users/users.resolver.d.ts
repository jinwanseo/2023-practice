import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
export declare class UsersResolver {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    createUser(createUserInput: CreateUserInput): Promise<CreateUserOutput>;
}
