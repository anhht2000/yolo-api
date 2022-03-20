import { I18nService } from 'nestjs-i18n';
import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ResponseData from 'src/common/ClassResponseData';
import { UserStatus } from 'src/configs/enum';
import { UserService } from '../services/user.service';
import { User } from '../entities/User.entity';

@Injectable()
export class AuthUserService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: Partial<User> = await this.usersService.findUser({
      select: ['email', 'password'],
      where: { email, status: UserStatus.ACTIVE },
    });

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.EMAIL_NON_EXISTED'),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    // const isTrue = await bcrypt.compare(pass, user.password);
    // if (!isTrue) {
    //   throw new HttpException(
    //     await this.i18n.translate('user.PASSWORD_INVALID'),
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    const isTrue = true;
    if (user && isTrue) {
      const { password, ...result } = user;

      return result;
    }

    throw new HttpException(
      await this.i18n.translate('user.LOGIN_VALIDATE_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  login(user: User) {
    const payload = {
      username: user.email,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  signToken(
    payload: { username: string; id: number },
    secret: string,
    expire: string,
  ) {
    return {
      refresh_token: this.jwtService.sign(payload, {
        secret,
        expiresIn: expire,
      }),
    };
  }

  // async changePassword(username: string, data: changePasswordProfileDTO) {
  //   const { password, new_password } = data;
  //   const user = await this.usersService.findOne({
  //     select: ['password', 'id'],
  //     where: { email: username },
  //   });

  //   if (!user) {
  //     throw new HttpException(
  //       await this.i18n.translate('user.EMAIL_NON_EXISTED'),
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //   const isTrue = await bcrypt.compare(password, user.password);
  //   if (!isTrue) {
  //     throw new HttpException(
  //       await this.i18n.translate('user.PASSWORD_INVALID'),
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //   const salt = await bcrypt.genSalt();
  //   const hash = await bcrypt.hash(new_password, salt);
  //   await this.usersService.updateObject(user.id, { password: hash });
  //   return true;
  // }

  // async forgetPass(username: string) {
  //   const user: User = await this.usersService.findOne({
  //     select: ['email', 'password'],
  //     where: { email: username, status: UserStatus.ACTIVE.toString() },
  //   });

  //   if (!user) {
  //     return null;
  //   }
  //   const payload = {
  //     username: user.email,
  //     id: user.id,
  //   };

  //   return {
  //     access_token: this.jwtService.sign(payload, {
  //       secret: process.env.EMAIL_TOKEN_SECRET,
  //       expiresIn: process.env.EMAIL_TOKEN_EXPIRED,
  //     }),
  //   };
  // }

  verify(token: string, secret: string) {
    return this.jwtService.verify(token, { secret });
  }
}
