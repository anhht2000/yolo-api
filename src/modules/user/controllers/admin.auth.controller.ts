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
import { AuthAdminService } from '../adminAuth/auth.admin.service';
import { LocalUserAuthGuard } from '../adminAuth/guards/local.guard';
import { loginDTO } from '../dtos/login.dto';
import { UserService } from '../services/user.service';

@Controller('v1/admin/auth')
@ApiTags('[Authentication] Admin')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class AuthAdminController {
  constructor(
    private authService: AuthAdminService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalUserAuthGuard)
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
