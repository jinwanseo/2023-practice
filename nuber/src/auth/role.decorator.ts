import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

export type RoleType = keyof typeof UserRole | 'Any';
export const Role = (roles: RoleType[]) => SetMetadata('roles', roles);
