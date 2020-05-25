import { IsEmail, IsString } from 'class-validator';

export class LoginBody {
  @IsEmail()
  login!: string;

  @IsString()
  password!: string;

}

export class RegistrationBody {

  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  birthday!: string;

  @IsString()
  gender!: string;

  @IsString()
  role!: string;


}