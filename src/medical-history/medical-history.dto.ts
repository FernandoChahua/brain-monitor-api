import { BloodType, HealthInsurance, Relationship } from "./entities/enums";

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
    
      existingDiseases;
    
      responsibleName: string;
    
      responsibleRelationship: Relationship;
    
      responsiblePhoneNumber: string;
    
      responsibleDni: string;
}