import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountInput } from 'src/common/dtos/create-account.dto';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  getAll(): Promise<User[]> {
    return this.users.find();
  }

  createAccount(createAccountInput: CreateAccountInput) {
    const newUser = this.users.create(createAccountInput);
    return this.users.save(newUser);
  }
}
