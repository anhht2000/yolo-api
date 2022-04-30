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
import { GetAllProductOption } from 'src/configs/product';
import { createProductDTO } from '../dtos/CreateProduct.dto';
import { updateProductDTO } from '../dtos/UpdateProduct.dto';
import { CartService } from '../services/cart.service';

@Controller('v1/cart')
@ApiTags('[Admin] Cart')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class CartController {
  constructor(
    private cartService: CartService,
    private readonly i18n: I18nService,
  ) {}

  // @Get()
  // @ApiQuery({ name: 'name', required: false })
  // @ApiQuery({ name: 'page', description: 'trang hiện tại', required: false })
  // @ApiQuery({
  //   name: 'limit',
  //   description: 'số lượng ở một trang',
  //   required: false,
  // })
  // async getAllProduct(
  //   @Req() req,
  //   @Res() res: Response,
  //   @I18nLang() lang: string,
  // ) {
  //   const limit = parseInt(req.query.limit || process.env.DEFAUT_PERPAGE);
  //   const page = parseInt(req.query.page || process.env.DEFAUT_PAGE);
  //   const searchOptions: GetAllProductOption = {
  //     page,
  //     limit,
  //     name: req.query.name,
  //   };

  //   const [data, total] = await this.productService.getAllProduct(
  //     searchOptions,
  //   );

  //   const response = new ResponseData(
  //     true,
  //     {
  //       data,
  //       page,
  //       limit,
  //       total: Math.ceil(total / limit),
  //       total_record: total,
  //     },
  //     null,
  //   );

  //   res.status(HttpStatus.OK).json(response);
  // }

  // @Post()
  // @ApiBody({ type: createProductDTO })
  // async create(
  //   @Req() req,
  //   @Res() res: Response,
  //   @Body() body: createProductDTO,
  //   @I18nLang() lang: string,
  // ) {
  //   const product = await this.productService.create(body);

  //   if (product) {
  //     const response = new ResponseData(
  //       true,
  //       {
  //         message: await this.i18n.translate('product.CREATE_PRODUCT_SUCCESS', {
  //           lang,
  //         }),
  //       },
  //       null,
  //     );
  //     return res.status(HttpStatus.OK).json(response);
  //   }

  //   throw new HttpException(
  //     await this.i18n.translate('product.CREATE_PRODUCT_FAIL'),
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  // @Get('/:id')
  // @ApiParam({ name: 'id', description: 'Mã của danh muc' })
  // async getOne(
  //   @Req() req,
  //   @Res() res: Response,
  //   @Param() { id },
  //   @I18nLang() lang: string,
  // ) {
  //   const product = await this.productService.findOne(id);

  //   if (product) {
  //     const response = new ResponseData(
  //       true,
  //       {
  //         product,
  //       },
  //       null,
  //     );
  //     return res.status(HttpStatus.OK).json(response);
  //   }

  //   throw new HttpException(
  //     await this.i18n.translate('product.UPDATE_PRODUCT_FAIL'),
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  // @Put('/:id')
  // @ApiParam({ name: 'id', description: 'Mã của danh muc' })
  // @ApiBody({ type: updateProductDTO })
  // async update(
  //   @Req() req,
  //   @Res() res: Response,
  //   @Body() body: updateProductDTO,
  //   @Param() { id },
  //   @I18nLang() lang: string,
  // ) {
  //   const product = await this.productService.update(id, body);

  //   if (product) {
  //     const response = new ResponseData(
  //       true,
  //       {
  //         message: await this.i18n.translate('product.UPDATE_PRODUCT_SUCCESS', {
  //           lang,
  //         }),
  //       },
  //       null,
  //     );
  //     return res.status(HttpStatus.OK).json(response);
  //   }

  //   throw new HttpException(
  //     await this.i18n.translate('product.UPDATE_PRODUCT_FAIL'),
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  // @Delete('/:id')
  // @ApiParam({ name: 'id', description: 'Mã của danh muc' })
  // async delete(
  //   @Req() req,
  //   @Res() res: Response,
  //   @Param() { id },
  //   @I18nLang() lang: string,
  // ) {
  //   const isDelete = await this.productService.delete(id);

  //   if (isDelete) {
  //     const response = new ResponseData(
  //       true,
  //       {
  //         message: await this.i18n.translate('product.DELETE_PRODUCT_SUCCESS', {
  //           lang,
  //         }),
  //       },
  //       null,
  //     );
  //     return res.status(HttpStatus.OK).json(response);
  //   }

  //   throw new HttpException(
  //     await this.i18n.translate('product.DELETE_PRODUCT_FAIL'),
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }
}
