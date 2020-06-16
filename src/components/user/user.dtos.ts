import { IsEmail, IsNumber, IsOptional, IsString, isValidationOptions, Matches } from 'class-validator';

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

export class AdminRegistrationBody {

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

}

export class ChangeUserRoleByAdminBody{
  @IsNumber()
  userId!: number;

  @IsString()
  userRole!: string;

}

export class UpdateUserMasterDataBody {
  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @Matches(/^[0-9]{5}$/)
  postCode: number;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  houseNumber: string;

  @IsOptional()
  @Matches(/^[0-9]{3}$/)
  apartments: number;

  @IsOptional()
  @Matches(/^[0-9]{16}$/)
  cardNumber: number;

  @IsOptional()
  @Matches(/^[0-9]{2}$/)
  cardMonth: string;

  @IsOptional()
  @Matches(/^[0-9]{2}$/)
  cardYear: number;

  @IsOptional()
  @Matches(/^[0-9]{4}$/)
  deliveryOfficeNumber: number;

  @IsOptional()
  @IsString()
  deliveryOfficeAddress: string;

  @IsOptional()
  @IsString()
  deliveryOfficeCity: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  faxNumber: string;

}

