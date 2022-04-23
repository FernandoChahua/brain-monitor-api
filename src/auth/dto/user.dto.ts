import { IsNotEmpty } from 'class-validator';
import { Role, UserStatus } from '../entities/user.entity';

export class UserDto {
    @IsNotEmpty()
      id: number;

    @IsNotEmpty()
      email:string;

    @IsNotEmpty()
      role: Role;

    status: UserStatus;
}
