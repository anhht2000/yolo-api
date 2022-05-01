import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { AuthAdminService } from '../adminAuth/auth.admin.service';
import { LocalUserAuthGuard } from '../adminAuth/guards/local.guard';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { loginDTO } from '../dtos/login.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('v1/admin/auth')
@ApiTags('[Authentication] Admin')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class AuthAdminController {
  constructor(
    private authService: AuthAdminService,
    private userService: UserService,
    private i18n: I18nService,
  ) {}

  @Post('login')
  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: loginDTO })
  async login(@Req() req, @Res() res: Response, @I18nLang() lang: string) {
    const token = (await this.authService.login(req.user))?.access_token;
    const response = new ResponseData(
      true,
      {
        user: this.authService.login(req.user),
        token,
      },
      null,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('login')
  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: loginDTO })
  async login(@Req() req, @Res() res: Response, @I18nLang() lang: string) {
    const token = (await this.authService.login(req.user))?.access_token;
    const response = new ResponseData(
      true,
      {
        user: this.authService.login(req.user),
        token,
      },
      null,
    );
    return res.status(HttpStatus.OK).json(response);
  }
}
