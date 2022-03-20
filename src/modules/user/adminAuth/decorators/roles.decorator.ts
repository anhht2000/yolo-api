import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';

export type Role = 'admin' | 'user';

export enum ERole {
  User = 'user',
  Admin = 'admin',
}
export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
