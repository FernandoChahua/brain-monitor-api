/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLoggerModule } from '../logger/custom-logger.module';
import { PatientModule } from '../patient/patient.module';
import { AssignmentRequestRepository } from './repositories/assignment-request.repository';
import { MagneticResonanceRepository } from './repositories/magnetic-resonance.repository';
import { MedicalHistoryRepository } from './repositories/medical-history.repository';
import { TreatmentRepository } from './repositories/treatment.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([AssignmentRequestRepository, MagneticResonanceRepository, MedicalHistoryRepository, TreatmentRepository]),
        forwardRef(() =>PatientModule),
        CustomLoggerModule
    ],
    controllers: [],
    providers: [],
})
export class MedicalHistoryModule {}
