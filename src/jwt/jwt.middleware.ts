import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    if ('token' in req.headers && !!req.headers.token) {
      try {
        const decoded = this.jwtService.verify(req.headers.token);
        if (typeof decoded === 'object' && 'id' in decoded) {
          req['user'] = await this.userService.findUserById(decoded.id);
        }
      } catch {}
    }
    next();
  }
}
