import { instanceToPlain } from 'class-transformer';


export class SignupDto {
  email: string;
  password: string;

  toJSON() {
    return instanceToPlain(this);
    }
}
