import { BloodType, HealthInsurance, MagneticResonanceStatus, PriorizationType, Relationship, TreatmentName, TreatmentStatus } from './entities/enums';

export class GetMedicalHistoryDto{
      patientName: string;
      registeredDate: Date;
      priorization: PriorizationType;
      patientDni: string;
      patientAge: number;
      medicalHistoryId: number;
      patientId: number;
      doctorId: number;
}

export class CreateMedicalHistoryDto {
  birthPlace: string;

  healthInsurance: HealthInsurance;

  bloodType: BloodType;

  hasRelativeWithCancer: boolean;

  weight: number;

  height: number;

  hadHospitalizations: boolean;

  hadTransfusions: boolean;

  hadSurgeries: boolean;

  haveAllergies: boolean;

  existingDiseases: string;

  responsibleName: string;

  responsibleRelationship: Relationship;

  responsiblePhoneNumber: string;

  responsibleDni: string;

  patientId: number;
}

export class GetMagneticResonanceDto {
  id: number;
  resonanceAreaName: string;
  resonanceImageLink: string;
  filename: string;
  medicalHistoryId: number;
  status: MagneticResonanceStatus;
  createdAt: Date;
}

export class AddDiagnosisDescription {
      diagnosisDescription: string;
      treatmentDescription: string;
}

export class AddTreatmentDto {
  treatmentName: TreatmentName;
  observation : string;
}

export class GetTreatmentDto {
  treatmentName: TreatmentName;
  createdAt: Date;
  observation: string;
  status: TreatmentStatus;
}