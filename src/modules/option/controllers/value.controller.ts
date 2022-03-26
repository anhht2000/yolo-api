import { createValueDTO } from './../dtos/CreateValue.dto';
import { ValueService } from './../services/value.service';
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
import { OptionService } from '../services/option.service';
import { updateValueDTO } from '../dtos/UpdateValue.dto';

@Controller('v1/admin/option-value')
@ApiTags('[Admin] Option Value')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class ValueController {
  constructor(
    private valueService: ValueService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @ApiBody({ type: createValueDTO })
  async create(
    @Req() req,
    @Res() res: Response,
    @Body() body: createValueDTO,
    @I18nLang() lang: string,
  ) {
    const value = await this.valueService.createOptionValue(body);

    if (value) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.CREATE_VALUE_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.CREATE_VALUE_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'Mã của nội dung danh muc' })
  @ApiBody({ type: updateValueDTO })
  async update(
    @Req() req,
    @Res() res: Response,
    @Body() body: updateValueDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const value = await this.valueService.updateOptionValue(id, body);

    if (value) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.UPDATE_VALUE_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.UPDATE_VALUE_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Mã của nội dung danh muc' })
  async get(
    @Req() req,
    @Res() res: Response,
    @Body() body: updateOptionDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const value = await this.valueService.getOptionValue(id);

    if (value) {
      const response = new ResponseData(
        true,
        {
          value,
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
  @ApiParam({ name: 'id', description: 'Mã của nội dung danh muc' })
  async delete(
    @Req() req,
    @Res() res: Response,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const isDelete = await this.valueService.deleteOptionValue(id);

    if (isDelete) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('option.DELETE_VALUE_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('option.DELETE_VALUE_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
