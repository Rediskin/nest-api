import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AdminRegistrationBody,
  ChangePasswordBody, ChangeUserRoleByAdminBody,
  ForgotPasswordQuery,
  LoginBody,
  RegistrationBody,
  RestorePasswordBody,
  UpdateOneByIdBody,
} from './user.dtos';
import { AuthUser } from '../../decorators/authUser';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post("/login")
  @HttpCode(200)
  login(@Body() body: LoginBody): Promise<any> {
    return this.userService.login(body);
  }

  @Post("/registration")
  @HttpCode(200)
  registration(@Body() body: RegistrationBody): Promise<any> {
    return this.userService.registration(body);
  }

  @Get("/getUser")
  @HttpCode(200)
  getUser(@AuthUser() authUser: any): Promise<any> {
    return this.userService.getUser(authUser);
  }

  @Post("/changePassword")
  @HttpCode(200)
  changePassword(@Body() body: ChangePasswordBody, @AuthUser() authUser: any): Promise<any> {
    return this.userService.changePassword(body, authUser);
  }

  @Post("/updateUser")
  @HttpCode(200)
  updateOneById(@Body() body: UpdateOneByIdBody, @AuthUser() authUser: any): Promise<any> {
    return this.userService.updateOneById(body, authUser);
  }

  @Get("/forgotPassword")
  @HttpCode(201)
  forgotPassword(@Query() query: ForgotPasswordQuery): Promise<void> {
    return this.userService.forgotPassword(query.email);
  }

  @Post("/restorePassword")
  @HttpCode(201)
  restorePassword(@Body() body: RestorePasswordBody, @AuthUser() authUser: any): Promise<void>{
    return this.userService.restorePassword(body.password, authUser);
  }

  /**
   * Admin Side
   **/

  @Post("/admin/registration")
  @HttpCode(200)
  registrationNewAdmin(@Body() body: AdminRegistrationBody, @AuthUser() authUser: any): Promise<void> {
    return this.userService.registrationNewAdmin(body, authUser);
  }

  @Get("/getUsersList")
  @HttpCode(200)
  getUsersList(@AuthUser() authUser: any): Promise<any>{
    return this.userService.getUsersList(authUser);
  }

  @Post("/admin/changeUserRole")
  @HttpCode(200)
  changeUserRoleByAdmin(@Body() body: ChangeUserRoleByAdminBody, @AuthUser() authUser: any): Promise<void>{
    return this.userService.changeUserRoleByAdmin(body, authUser);
  }
//создать новый эндпоинт в котором супер админ может поменять роль у пользователя

}