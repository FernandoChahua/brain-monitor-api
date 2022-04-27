/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IReqWithToken } from 'src/auth/req-with-token.interface';
import {
  AddDiagnosisDescription,
  AddTreatmentDto,
  CreateMedicalHistoryDto,
} from './medical-history.dto';
import { MedicalHistoryService } from './medical-history.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PaginationOptionsInterface } from 'src/utils/pagination/pagination.options.interface';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}
  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async createMedicalHistory(
    @Req() req: IReqWithToken,
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
  ) {
    return this.medicalHistoryService.createMedicalHistory(
      createMedicalHistoryDto,
    );
  }

  @Get('/:doctorId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMedicalHistoriesByDoctorId(
    @Req() req: IReqWithToken,
    @Param('doctorId', new ParseIntPipe()) doctorId: number,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    if (page < 1) page = 1;
    const options = new PaginationOptionsInterface();
    options.limit = limit;
    options.page = page;
    options.query = '';

    return this.medicalHistoryService.getMedicalHistoriesByDoctorId(
      doctorId,
      options,
    );
  }

  @Post('/magnetic-resonance/:medicalHistoryId')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/magnetic-resonance',
        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          if (!['.jpeg', '.jpg', '.png'].includes(extension))
            cb(
              new HttpException(
                `No se permite la extensión ${extension}`,
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
          const { id } = req.user;
          const filename = `medical-history-${req.user.id}-${
            req.params.medicalHistoryId
          }-${uuidv4()}${extname(file.originalname)}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async addMagneticResonanceToMedicalHistory(
    @Req() req: IReqWithToken,
    @Body('resonanceAreaName') resonanceAreaName: string,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
    @UploadedFile() file,
  ) {
    const { filename } = file;

    return this.medicalHistoryService.addMagneticResonance({
      resonanceAreaName,
      medicalHistoryId,
      filename,
    });
  }

  @Get('/magnetic-resonance/:medicalHistoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMagneticResonances(
    @Req() req: IReqWithToken,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
  ) {
    return this.medicalHistoryService.getMagneticResonances(
      req.user.id,
      medicalHistoryId,
    );
  }

  @Delete('/magnetic-resonance/:magneticResonanceId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async deleteMagneticResonanceById(
    @Req() req: IReqWithToken,
    @Param('magneticResonanceId', new ParseIntPipe())
    magneticResonanceId: number,
  ) {
    return this.medicalHistoryService.deleteMagneticResonance(
      magneticResonanceId,
    );
  }

  @Get('/diagnosis/:medicalHistoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMedicalHistoryDiagnosis(
    @Req() req: IReqWithToken,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
  ) {
    return this.medicalHistoryService.getMedicalHistoryDiagnosis(
      medicalHistoryId,
    );
  }

  @Post('/diagnosis/:medicalHistoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async addDiagnosisDescriptionToMedicalHistory(
    @Req() req: IReqWithToken,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
    @Body() diagnosisDescriptionDto: AddDiagnosisDescription,
  ) {
    return this.medicalHistoryService.addDiagnosisDescription(
      medicalHistoryId,
      diagnosisDescriptionDto,
    );
  }

  @Get('/treatment/:medicalHistoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getTreatmentByMedicalHistoryId(
    @Req() req: IReqWithToken,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    if (page < 1) page = 1;
    const options = new PaginationOptionsInterface();
    options.limit = limit;
    options.page = page;
    options.query = '';

    return this.medicalHistoryService.getTreatmentsByMedicalHistory(
      medicalHistoryId,
      options,
    );
  }

  @Post('/treatment/:medicalHistoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async addTreatmentToMedicalHistory(
    @Req() req: IReqWithToken,
    @Param('medicalHistoryId', new ParseIntPipe()) medicalHistoryId: number,
    @Body() addTreatmentDto: AddTreatmentDto,
  ) {
    return this.medicalHistoryService.addTreatment(
      medicalHistoryId,
      addTreatmentDto,
    );
  }
}
