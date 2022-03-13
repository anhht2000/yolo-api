import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { loginDTO } from '../dtos/login.dto';
import { UserService } from '../services/user.service';

@Controller('v1/user')
@ApiTags('[User]')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: loginDTO })
  async login(@Req() req, @Res() res: Response, @I18nLang() lang: string) {
    const response = new ResponseData(
      true,
      {
        user: this.authService.login(req.user),
      },
      null,
    );
    return res.status(HttpStatus.OK).json(response);
  }
}
