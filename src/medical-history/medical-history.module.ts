import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLoggerModule } from '../logger/custom-logger.module';
import { AssignmentRequestRepository } from './repositories/assignment-request.repository';
import { MagneticResonanceRepository } from './repositories/magnetic-resonance.repository';
import { MedicalHistoryRepository } from './repositories/medical-history.repository';
import { TreatmentRepository } from './repositories/treatment.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssignmentRequestRepository,
      MagneticResonanceRepository,
      MedicalHistoryRepository,
      TreatmentRepository,
    ]),
    forwardRef(() => AuthModule),
    CustomLoggerModule,
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
