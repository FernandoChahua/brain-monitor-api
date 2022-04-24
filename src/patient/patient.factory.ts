import { CreatePatientDto } from "./patient.dto";
import { Patient } from "./patient.entity";

export class PatientFactory {
    public static convertDtoToEntity(createPatientDto: CreatePatientDto): Patient{
        const patient = new Patient();
        patient.address = createPatientDto.address;
        patient.birthDate = createPatientDto.birthDate;
        patient.dni = createPatientDto.dni;
        

        return patient;
    }
}