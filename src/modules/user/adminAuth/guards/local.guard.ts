import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalUserAuthGuard extends AuthGuard('admin_local') {}
