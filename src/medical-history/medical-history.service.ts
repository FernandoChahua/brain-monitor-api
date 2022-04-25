/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PatientService } from '../patient/patient.service';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { AssignmentRequestRepository } from './repositories/assignment-request.repository';
import { MagneticResonanceRepository } from './repositories/magnetic-resonance.repository';
import { MedicalHistoryRepository } from './repositories/medical-history.repository';
import { TreatmentRepository } from './repositories/treatment.repository';
import { CreateMedicalHistoryDto } from './medical-history.dto';
import { MedicalHistoryFactory } from './medical-history.factory';

@Injectable()
export class MedicalHistoryService {
    constructor(
        private readonly logger: CustomLoggerService,
        @InjectRepository(MedicalHistoryRepository)
        private readonly _medicalHistoryRepo: MedicalHistoryRepository,
        @InjectRepository(MagneticResonanceRepository)
        private readonly _magneticResonanceRepo: MagneticResonanceRepository,
        @InjectRepository(AssignmentRequestRepository)
        private readonly _assignmentRequestRepo: AssignmentRequestRepository,
        @InjectRepository(TreatmentRepository)
        private readonly _treatmentRepo: TreatmentRepository,
  ) {
    this.logger = new CustomLoggerService(MedicalHistoryService.name);
  }


  async createMedicalHistory(createMedicalHistory: CreateMedicalHistoryDto){
    const medicalHistoryEntity = MedicalHistoryFactory.convertCreateDtoToEntity(createMedicalHistory);

    await medicalHistoryEntity.save();

    return {
      medicalHistoryId: medicalHistoryEntity.id
    };
  }
  
}
