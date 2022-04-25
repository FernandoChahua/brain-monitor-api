import { Patient } from "src/patient/patient.entity";
import { MedicalHistory } from "./entities/medical-history.entity";
import { CreateMedicalHistoryDto } from "./medical-history.dto";

export class MedicalHistoryFactory {
    public static convertCreateDtoToEntity(createMedicalHistoryDto: CreateMedicalHistoryDto): MedicalHistory{
        const medicalHistory = new MedicalHistory();
        medicalHistory.birthPlace = createMedicalHistoryDto.birthPlace;
        medicalHistory.bloodType = createMedicalHistoryDto.bloodType;
        medicalHistory.existingDiseases = createMedicalHistoryDto.existingDiseases;
        medicalHistory.hadHospitalizations = createMedicalHistoryDto.hadHospitalizations;
        medicalHistory.hadSurgeries = createMedicalHistoryDto.hadSurgeries;
        medicalHistory.hadTransfusions = createMedicalHistoryDto.hadTransfusions;
        medicalHistory.haveAllergies = createMedicalHistoryDto.haveAllergies;
        medicalHistory.healthInsurance = createMedicalHistoryDto.healthInsurance;
        medicalHistory.height = createMedicalHistoryDto.height;
        medicalHistory.weight = createMedicalHistoryDto.weight;
        medicalHistory.responsibleDni = createMedicalHistoryDto.responsibleDni;
        medicalHistory.responsibleName = createMedicalHistoryDto.responsibleName;
        medicalHistory.responsiblePhoneNumber = createMedicalHistoryDto.responsiblePhoneNumber;
        medicalHistory.responsibleRelationship = createMedicalHistoryDto.responsibleRelationship;
        const patient = new Patient();
        patient.id = createMedicalHistoryDto.patientId;

        medicalHistory.patient = patient;

        return medicalHistory;
    }
}