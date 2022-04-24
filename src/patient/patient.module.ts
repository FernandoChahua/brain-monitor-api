import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
/*
https://docs.nestjs.com/modules
*/

import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { CustomLoggerModule } from 'src/logger/custom-logger.module';
import { AuthModule } from 'src/auth/auth.module';
import { MedicalHistoryModule } from 'src/medical-history/medical-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository]), CustomLoggerModule, forwardRef(() => AuthModule), forwardRef(() =>  MedicalHistoryModule)],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
