import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('user_jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          success: false,
          payload: null,
          error: {
            code: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
          },
        })
      );
    }
    return user;
  }
}
