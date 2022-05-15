/* eslint-disable prefer-const */
import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { I18nLang, I18nService } from 'nestjs-i18n';
import ResponseData from 'src/common/ClassResponseData';
import { SingleFileUploadDTO } from './dto/single-file.dto';
import { FileService } from './file.service';

@ApiTags('[Chung] Upload tệp tin')
@Controller('v1')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly i18n: I18nService,
  ) {}
  @Post('upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SingleFileUploadDTO })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          let now = new Date();
          const dir = `public/temporary/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}/${now.getHours()}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          cb(null, dir);
        },
        filename: function (req, file, cb) {
          const { originalname } = file;
          const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
          cb(null, `${file.fieldname}${Date.now()}${fileExtension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(
            new BadRequestException({
              success: false,
              payload: null,
              error: {
                code: HttpStatus.BAD_REQUEST,
                message: 'Provide a valid image',
              },
            }),
            false,
          );
        }
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() response: Response,
    @I18nLang() lang: string,
  ) {
    let responeData = new ResponseData(
      true,
      {
        message: 'Upload file successfully',
        path: file.path.replace('public', ''),
      },
      null,
    );

    return response.status(HttpStatus.OK).json(responeData);
  }

  @Post('admin/building/upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SingleFileUploadDTO })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          let now = new Date();
          const dir = `public/temporary/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}/${now.getHours()}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          cb(null, dir);
        },
        filename: function (req, file, cb) {
          const { originalname } = file;
          const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
          cb(null, `${file.fieldname}${Date.now()}${fileExtension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(
            new BadRequestException({
              success: false,
              payload: null,
              error: {
                code: HttpStatus.BAD_REQUEST,
                message: 'Provide a valid image',
              },
            }),
            false,
          );
        }
      },
    }),
  )
  async uploadWeb(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() response: Response,
    @I18nLang() lang: string,
  ) {
    let responeData = new ResponseData(
      true,
      {
        message: 'Upload file successfully',
        path: file.path.replace('public', ''),
      },
      null,
    );

    return response.status(HttpStatus.OK).json(responeData);
  }
}
