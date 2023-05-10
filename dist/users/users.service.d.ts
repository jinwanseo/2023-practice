import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EmailService } from 'src/email/email.service';
export declare class UsersService {
    private readonly users;
    private readonly verifications;
    private readonly emailService;
    constructor(users: Repository<User>, verifications: Repository<Verification>, emailService: EmailService);
    getUsers(): Promise<User[]>;
    createUser({ email, password, role, }: CreateUserInput): Promise<CreateUserOutput>;
}
