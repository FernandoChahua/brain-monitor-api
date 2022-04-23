import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { CustomMessages } from '../../exception/custom-messages';
import { StringUtil } from '../../utils/string-util';

export class SigninDto {
  email: string;
  password: string;
}
