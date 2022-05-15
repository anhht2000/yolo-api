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
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { createReceiptDTO } from '../dtos/CreateReceipt.dto';
import { updateReceiptDTO } from '../dtos/UpdateReceipt.dto';
import { ReceiptService } from '../services/receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(
    private receiptService: ReceiptService,
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
  async getAllProduct(
    @Req() req,
    @Res() res: Response,
    @I18nLang() lang: string,
  ) {
    const limit = parseInt(req.query.limit || process.env.DEFAUT_PERPAGE);
    const page = parseInt(req.query.page || process.env.DEFAUT_PAGE);
    const searchOptions: any = {
      page,
      limit,
      name: req.query.name,
    };

    const [data, total] = await this.receiptService.getAllReceipt(
      searchOptions,
    );

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
  @ApiBody({ type: createReceiptDTO })
  async create(
    @Req() req,
    @Res() res: Response,
    @Body() body: createReceiptDTO,
    @I18nLang() lang: string,
  ) {
    const product = await this.receiptService.create(req.user.username, body);

    if (product) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('product.CREATE_PRODUCT_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('product.CREATE_PRODUCT_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Put('/:id')
  @ApiBody({ type: updateReceiptDTO })
  async update(
    @Req() req,
    @Res() res: Response,
    @Body() body: updateReceiptDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const product = await this.receiptService.update(id, body);

    if (product) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('receipt.UPDATE_RECEIPT_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('receipt.UPDATE_RECEIPT_FAIL'),
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
    const isDelete = await this.receiptService.delete(id);

    if (isDelete) {
      const response = new ResponseData(
        true,
        {
          message: await this.i18n.translate('receipt.DELETE_RECEIPT_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('receipt.DELETE_RECEIPT_FAIL'),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
