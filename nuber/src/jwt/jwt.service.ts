import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.config.get(JWT_SECRET));
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.config.get(JWT_SECRET));
  }
}
