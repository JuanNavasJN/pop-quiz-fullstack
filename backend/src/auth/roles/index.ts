import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
