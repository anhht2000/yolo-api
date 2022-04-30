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

  @Post()
  @ApiBody({ type: CreateUserDTO })
  async create(
    @Req() req,
    @Res() res: Response,
    @Body() body: CreateUserDTO,
    @I18nLang() lang: string,
  ) {
    const user = await this.userService.create(body);

    if (user) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('user.CREATE_ADMIN_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('user.CREATE_ADMIN_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Put('/:id')
  @ApiBody({ type: UpdateUserDTO })
  async update(
    @Req() req,
    @Res() res: Response,
    @Param() { id },
    @Body() body: UpdateUserDTO,
    @I18nLang() lang: string,
  ) {
    const user = await this.userService.update(id, body);

    if (user) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('user.UPDATE_USER_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('user.UPDATE_USER_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

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
