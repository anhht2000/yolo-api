import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { I18nLang, I18nService } from 'nestjs-i18n';
import { Strategy } from 'passport-local';
import ResponseData from 'src/common/ClassResponseData';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'user_local') {
  constructor(
    private authService: AuthService,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const mess_unauthorization = await this.i18n.translate(
      'user.LOGIN_UNAUTHORIZATION',
      { lang: 'vi' },
    );

    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidate = regEx.test(username);
    if (!isValidate || !password) {
      const mess_validation_fail = await this.i18n.translate(
        'user.LOGIN_VALIDATE_FAIL',
        { lang: 'vi' },
      );
      const response = new ResponseData(false, null, {
        code: HttpStatus.BAD_REQUEST,
        message: mess_validation_fail,
      });
      throw new BadRequestException(response);
    }

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      const response = new ResponseData(false, null, {
        code: HttpStatus.UNAUTHORIZED,
        message: mess_unauthorization,
      });
      throw new UnauthorizedException(response);
    }
    const tets = user;
    return tets;
  }
}
