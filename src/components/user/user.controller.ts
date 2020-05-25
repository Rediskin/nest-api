import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginBody, RegistrationBody } from './user.dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  getUser(@Query() query: { token: string }, authUser: any): Promise<any> {
    return this.userService.registration(body);
  }
}