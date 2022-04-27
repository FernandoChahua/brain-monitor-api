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
import { AddDiagnosisDescription, AddTreatmentDto, CreateMedicalHistoryDto, GetMedicalHistoryDto, GetTreatmentDto } from './medical-history.dto';
import { MedicalHistoryFactory } from './medical-history.factory';
import { MagneticResonance } from './entities/magnetic-resonance.entity';
import { MedicalHistory } from './entities/medical-history.entity';
import { ImageHandler } from 'src/utils/image-handler';
import { MagneticResonanceStatus, MecialHistoryStatus, TreatmentStatus } from './entities/enums';
import { PaginationOptionsInterface } from 'src/utils/pagination/pagination.options.interface';
import { PaginationFactory } from 'src/utils/pagination/pagination.factory';
import { Treatment } from './entities/treatment.entity';

interface MagneticResonanceInput {
  resonanceAreaName: string;
  medicalHistoryId: number;
  filename: string;
}

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

  // Medical Histories functions

  async createMedicalHistory(createMedicalHistory: CreateMedicalHistoryDto) {
    const medicalHistoryEntity =
      MedicalHistoryFactory.convertCreateDtoToEntity(createMedicalHistory);
    // TODO: valid exist patient

    await medicalHistoryEntity.save();

    return {
      medicalHistoryId: medicalHistoryEntity.id,
    };
  }

  async getMedicalHistoriesByDoctorId(doctorId: number, options: PaginationOptionsInterface){

    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._medicalHistoryRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where:
        {
          status: MecialHistoryStatus.ACTIVE,
          patient: { doctor: { id: doctorId }}
        },
      order: { createdAt: 'DESC' },
      relations: ['patient', 'patient.doctor'],
    });

    const results = await Promise.all(data.map(async (medicalHistory) => {

      return MedicalHistoryFactory.convertEntityToGetMedicalHistoryDto(medicalHistory);
    }));

    const response = PaginationFactory.buildPaginationResult<GetMedicalHistoryDto>(
      results,
      options.limit,
      options.page,
      total,
    );
    return response;
  }

 // Magnetic Resonance functions
  
  async addMagneticResonance({
    resonanceAreaName,
    medicalHistoryId,
    filename,
  }: MagneticResonanceInput) {
    const magneticResonanceEntity = new MagneticResonance();
    magneticResonanceEntity.filename = filename;
    magneticResonanceEntity.resonanceAreaName = resonanceAreaName;
    magneticResonanceEntity.resonanceImageLink =
      ImageHandler.getMagneticResonanceUrl(filename);
    const medicalHistory = new MedicalHistory();
    medicalHistory.id = medicalHistoryId;

    // TODO: valid exist medical history 

    magneticResonanceEntity.medicalHistory = medicalHistory;
    await magneticResonanceEntity.save();
  }

  async getMagneticResonances(userId: number, medicalHistoryId: number) {
    
    // TODO: valid exist medical history 

    const magneticResonances = await this._magneticResonanceRepo.find({
      where: {
        medicalHistory: {
          id: medicalHistoryId,
        },
        status: MagneticResonanceStatus.ACTIVE,
      },
      relations: ['medicalHistory']
    });
    return magneticResonances.map((magneticResonance) => MedicalHistoryFactory.convertEntityToGetMagneticResonanceDto(magneticResonance));
  }

  async deleteMagneticResonance(magneticResonanceId: number){
    const magneticResonance = await this._magneticResonanceRepo.findOne({where:{id: magneticResonanceId, status: MagneticResonanceStatus.ACTIVE}});

    if(!magneticResonance){
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }

    magneticResonance.status = MagneticResonanceStatus.INACTIVE;
    await magneticResonance.save();
  }

  // Diagnosis Functions

  async getMedicalHistoryDiagnosis(medicalHistoryId: number){
    // TODO: valid exist medical history 
    // TODO: Call AWS and get percentage diagnosis

    return {
      percentage: 0.8
    };
  }

  async addDiagnosisDescription(medicalHistoryId: number, addDiagnosisDescription: AddDiagnosisDescription){
    const medicalHistory = await this._medicalHistoryRepo.findOne({where: { id: medicalHistoryId, status: MecialHistoryStatus.ACTIVE }});

    if(!medicalHistory){
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }

    medicalHistory.diagnosisDescription = addDiagnosisDescription.diagnosisDescription;
    medicalHistory.treatmentDescription = addDiagnosisDescription.treatmentDescription;
    await medicalHistory.save();
  }

  // Treatment functions

  async addTreatment(medicalHistoryId: number, addTreatmentDto: AddTreatmentDto){
    // TODO: ADD VALIDATION EXIST MEDICAL HISTORY

    const treatment = new Treatment();
    treatment.medicalHistory = new MedicalHistory();
    treatment.medicalHistory.id = medicalHistoryId;
    treatment.treatmentName = addTreatmentDto.treatmentName;
    treatment.observation = addTreatmentDto.observation;
    await treatment.save();
  }

  async getTreatmentsByMedicalHistory(medicalHistoryId: number, options: PaginationOptionsInterface){
    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._treatmentRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where:
        {
          status: TreatmentStatus.ACTIVE,
          medicalHistory: { id: medicalHistoryId }
        },
      order: { createdAt: 'DESC' },
      relations: ['medicalHistory'],
    });

    const results = await Promise.all(data.map(async (treatment) => {

      return MedicalHistoryFactory.convertEntityToGetTreatmentDto(treatment);
    }));

    const response = PaginationFactory.buildPaginationResult<GetTreatmentDto>(
      results,
      options.limit,
      options.page,
      total,
    );
    return response;
  }
}
