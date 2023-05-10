import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly emailService: EmailService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.users.find();
  }

  async createUser({
    email,
    password,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exist = await this.users.exist({ where: { email } });
      if (exist) throw new Error('user exist');

      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );

      const verification = await this.verifications.save(
        this.verifications.create({ user }),
      );

      await this.emailService.verifyEmail({
        to: user.email,
        code: verification.code,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
