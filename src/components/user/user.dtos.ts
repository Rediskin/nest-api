import { IsEmail, IsOptional, IsString, isValidationOptions } from 'class-validator';

export class LoginBody {
  @IsEmail()
  login!: string;

  @IsString()
  password!: string;

}
export class UpdateOneByIdBody {
  @IsOptional()
  @IsString()
  username!: string;

  @IsOptional()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  birthday!: string;

  @IsOptional()
  @IsString()
  gender!: string;

  @IsOptional()
  @IsString()
  role!: string;
}

export class ChangePasswordBody {
  @IsString()
  oldPassword!: string;

  @IsString()
  newPassword!: string;
}

export class ForgotPasswordQuery{
  @IsEmail()
  email!: string;
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

export class RestorePasswordBody{
  @IsString()
  password!: string;
}