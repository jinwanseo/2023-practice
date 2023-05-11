import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleType } from './role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleType>('roles', context.getHandler());
    if (!roles) return true;

    const gqlCtx = GqlExecutionContext.create(context).getContext();
    if ('user' in gqlCtx && !!gqlCtx.user) {
      if (roles.includes('Any')) return true;
      return roles.includes(gqlCtx.user.role);
    }
  }
}
