/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from 'src/logger/custom-logger.service';
import { PatientStatus } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {

    constructor(
        private readonly logger: CustomLoggerService,
        @InjectRepository(PatientRepository)
        private readonly _patientRepository: PatientRepository,
  ) {
    this.logger = new CustomLoggerService(PatientService.name);
  }

  async findPatientByDni(dni: string){
      return this._patientRepository.findOne({where:{dni,status: PatientStatus.ACTIVE}});
  }

  async createPatient(userId: number) : Promise<void>{
    
  }


}
