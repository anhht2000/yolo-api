import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { ChangeStatusDTO } from '../dtos/ChangeStatus.dto';
import { UserService } from '../services/user.service';
import { AuthUserService } from '../userAuth/auth.user.service';
import { LocalUserAuthGuard } from '../userAuth/guards/local.guard';

@Controller('v1/user')
@ApiTags('[User]')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class UserController {
  constructor(
    private authService: AuthUserService,
    private userService: UserService,
  ) {}

  @Get('/')
  // @UseGuards(LocalUserAuthGuard)
  @ApiQuery({ name: 'page', description: 'trang hiện tại', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'số lượng ở một trang',
    required: false,
  })
  @ApiQuery({ name: 'name', required: false })
  async getAll(@Req() req, @Res() res: Response, @I18nLang() lang: string) {
    const { page, limit, name } = req.query;
    const _page = Number(page || process.env.DEFAUT_PAGE);
    const _limit = Number(limit || process.env.DEFAUT_PERPAGE);

    const options = {
      name,
    };

    const [data, total] = await this.userService.findAllUser(
      _limit,
      _page,
      options,
    );

    const response = new ResponseData(
      true,
      { data, page: _page, limit: _limit, total: Math.ceil(total / _limit) },
      null,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @Put('/change-status/:id')
  @ApiBody({ type: ChangeStatusDTO })
  async update(
    @Req() req,
    @Res() res: Response,
    @Body() body: ChangeStatusDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const product = await this.userService.changeStatus(id, body);

    if (product) {
      const response = new ResponseData(
        true,
        {
          message: 'Đổi trạng thái người dùng thành công',
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      'Đổi trạng thái người dùng thất bại ',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
