/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReqWithToken } from 'src/auth/req-with-token.interface';
import { CreateMedicalHistoryDto } from './medical-history.dto';
import { MedicalHistoryService } from './medical-history.service';

@Controller('medical-history')
export class MedicalHistoryController {

    constructor(private readonly medicalHistoryService: MedicalHistoryService){}
    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getDepartments(@Req() req: IReqWithToken, @Body() createMedicalHistoryDto: CreateMedicalHistoryDto){
      return this.medicalHistoryService.createMedicalHistory(createMedicalHistoryDto);
    }
}
