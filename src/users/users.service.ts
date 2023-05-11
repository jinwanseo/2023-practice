import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { UpdateUserInput, UpdateUserOutput } from './dtos/update-user.dto';
import { LoginUserInput, LoginUserOutput } from './dtos/login-user.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
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

  async updateUser(
    user: User,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      await this.users.save(this.users.create({ ...user, ...updateUserInput }));

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

  async loginUser({
    email,
    password,
  }: LoginUserInput): Promise<LoginUserOutput> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!user) throw new Error('login fail');

      const result = await user.comparePassword(password);
      if (!result) throw new Error('login fail');

      const token = this.jwtService.sign({ id: user.id });

      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findUserById(userId: number): Promise<User> {
    return this.users.findOne({ where: { id: userId } });
  }
}
