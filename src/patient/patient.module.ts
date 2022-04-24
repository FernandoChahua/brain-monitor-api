import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
/*
https://docs.nestjs.com/modules
*/

import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { CustomLoggerModule } from '../logger/custom-logger.module';
import { AuthModule } from '../auth/auth.module';
import { MedicalHistoryModule } from '../medical-history/medical-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository]), CustomLoggerModule, forwardRef(() => AuthModule), forwardRef(() =>  MedicalHistoryModule)],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
