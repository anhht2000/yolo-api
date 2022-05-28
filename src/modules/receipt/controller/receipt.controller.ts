import { JwtUserAuthGuard } from 'src/modules/user/userAuth/guards/jwt-auth.guard';
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { createReceiptDTO } from '../dtos/CreateReceipt.dto';
import { updateReceiptDTO } from '../dtos/UpdateReceipt.dto';
import { ReceiptService } from '../services/receipt.service';
import { ChangeStatusDTO } from 'src/modules/user/dtos/ChangeStatus.dto';

@Controller('v1/admin/receipt')
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

  @Get('/user')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', description: 'trang hiện tại', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'số lượng ở một trang',
    required: false,
  })
  async getAllProductUser(
    @Req() req,
    @Res() res: Response,
    @I18nLang() lang: string,
  ) {
    const limit = parseInt(req.query.limit || process.env.DEFAUT_PERPAGE);
    const page = parseInt(req.query.page || process.env.DEFAUT_PAGE);
    const searchOptions: any = {
      page,
      limit,
      username: req.user.username,
      name: req.query.name,
    };

    const [data, total] = await this.receiptService.getAllReceiptUser(
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
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
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
          message: await this.i18n.translate('product.CREATE_RECEIPT_SUCCESS', {
            lang,
          }),
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      await this.i18n.translate('product.CREATE_RECEIPT_FAIL'),
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

  @Put('/change-status/:id')
  @ApiBody({ type: ChangeStatusDTO })
  async changeStatus(
    @Req() req,
    @Res() res: Response,
    @Body() body: ChangeStatusDTO,
    @Param() { id },
    @I18nLang() lang: string,
  ) {
    const product = await this.receiptService.changeStatus(id, body);

    if (product) {
      const response = new ResponseData(
        true,
        {
          message: 'Đổi trạng hóa đơn thành công',
        },
        null,
      );
      return res.status(HttpStatus.OK).json(response);
    }

    throw new HttpException(
      'Đổi trạng thái  hóa đơn thất bại ',
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
