import { createProductDTO } from './../dtos/CreateProduct.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { GetAllProductOption } from 'src/configs/product';
import { ProductService } from '../services/product.service';

@Controller('v1/admin/product')
@ApiTags('[Admin] Product')
@ApiHeader({ name: 'Accept-Language', enum: ['vi', 'en'] })
export class ProductController {
  constructor(
    private productService: ProductService,
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
    const searchOptions: GetAllProductOption = {
      page,
      limit,
      name: req.query.name,
    };

    const [data, total] = await this.productService.getAllOption(searchOptions);

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
  @ApiBody({ type: createProductDTO })
  async create(
    @Req() req,
    @Res() res: Response,
    @Body() body: createProductDTO,
    @I18nLang() lang: string,
  ) {
    const option = '';
    // await this.productService.createOption(body);

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
}
