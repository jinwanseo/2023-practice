import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { EmailService } from 'src/email/email.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersResolver, UsersService, EmailService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
