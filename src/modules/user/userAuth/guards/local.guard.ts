import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalUserAuthGuard extends AuthGuard('user_local') {}
