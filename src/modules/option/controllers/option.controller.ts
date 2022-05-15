import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { GetAllOption } from 'src/configs/option';
import { createOptionDTO } from '../dtos/CreateOption.dto';
import { updateOptionDTO } from '../dtos/UpdateOption.dto';
import { OptionService } from './../services/option.service';

@Controller('v1/admin/option')
@ApiTags('[Admin] Option')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class OptionController {
  constructor(
    private optionService: OptionService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', description: 'trang hiện tại', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'số lượng ở một trang',
    required: false,
  })
  async getAllOption(
    @Req() req,
    @Res() res: Response,
    @I18nLang() lang: string,
  ) {
    const limit = parseInt(req.query.limit || process.env.DEFAUT_PERPAGE);
    const page = parseInt(req.query.page || process.env.DEFAUT_PAGE);
    const searchOptions: GetAllOption = {
      page,
      limit,
      name: req.query.name,
    };

    const [data, total] = await this.optionService.getAllOption(searchOptions);

    const response = new ResponseData(
      true,
      {
        data,
        page,
        limit,
        total: Math.ceil(total / limit),
        total_record: total,
      },
      null,
    );

    res.status(HttpStatus.OK).json(response);
  }

  @Post()
  @ApiBody({ type: createOptionDTO })
  async create(
    @Req() req,
    @Res() res: Response,
    @Body() body: createOptionDTO,
    @I18nLang() lang: string,
  ) {
    const option = await this.optionService.createOption(body);

    if (option) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.CREATE_OPTION_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.CREATE_OPTION_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'Mã của danh muc để sửa' })
  @ApiBody({ type: updateOptionDTO })
  async update(
    @Req() req,
    @Res() res: Response,
    @Body() body: updateOptionDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const option = await this.optionService.updateOption(id, body);

    if (option) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.UPDATE_OPTION_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.UPDATE_OPTION_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Mã của danh muc' })
  @ApiBody({ type: updateOptionDTO })
  async get(
    @Req() req,
    @Res() res: Response,
    @Body() body: updateOptionDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const option = await this.optionService.getOption({
      relations: ['values'],
      where: { id },
    });

    if (option) {
      const response = new ResponseData(
        true,
        {
          option,
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.GET_LIST_OPTION_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Mã của danh muc' })
  async delete(
    @Req() req,
    @Res() res: Response,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const isDelete = await this.optionService.deleteOption(id);

    if (isDelete) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.DELETE_OPTION_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.DELETE_OPTION_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
