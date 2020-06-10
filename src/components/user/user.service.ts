import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordBody, LoginBody, RegistrationBody, UpdateOneByIdBody } from './user.dtos';
import * as crypto from 'crypto';
import { jwt } from '../../utils/jwt';
import { usersRepository } from './user.repository';
import { User, UserStatuses } from './user.entities';
import { lang } from '../../utils/lang';
import * as randomstring from 'randomstring';
import { mailer } from '../../utils/mailer';

@Injectable()
export class UserService {
  // constructor(
  //   private usersRepository: UsersRepository,
  //   private jwt: Jwt,
  // ) {}
  /**
   * validates token
   * @param token of user that is authenticating
   * @param isAdmin admin route flag
   */
  public authenticateUser = async (token: string): Promise<User> => {
    const parsedToken = await jwt.verify(token);
    const user = await usersRepository.getUserTokenByUserId(parseInt(parsedToken.id));
    if (user.token !== token) {
      throw new BadRequestException({
        status:401,
        error: lang["EN"].token_is_invalid,
      }, "401");
    } else {
      return user.thisOne;
    }
  };

  public getUser = async (authUser: any): Promise<any> => {
    return await usersRepository.getUserPublicData(authUser.id);
  };

  public  updateOneById = async (body: UpdateOneByIdBody, authUser: any): Promise<void> => {
    const user = await usersRepository.getUserById(authUser.id);
    await usersRepository.updateOneById(user.id, body );

  }

  public changePassword = async (body: ChangePasswordBody, authUser: any): Promise<any> => {
    const user = await usersRepository.getUserById(authUser.id);
    const oldPass = await crypto.pbkdf2Sync(body.oldPassword, process.env.SECRET, 1000, 64, "sha512");
    const oldPassHash = oldPass.toString('hex');
    if (user.oldPassword === oldPassHash) {
      throw new BadRequestException({
        status: 400,
        error: lang["EN"].duplicate_password,
      }, "400");
    }
    if (user.password !== oldPassHash){
      throw new BadRequestException({
        status: 400,
        error: lang["EN"].password_is_invalid,
      }, "400");
    }
    const newPass = await crypto.pbkdf2Sync(body.newPassword, process.env.SECRET, 1000, 64, "sha512");
    const newPassHash = newPass.toString('hex');
    await usersRepository.updateOneById(user.id,{password: newPassHash, oldPassword: newPassHash});
  };

  public login = async (body: LoginBody): Promise<any> => {
    const user = await usersRepository.getUserByEmail(body.login);
    const pass = await crypto.pbkdf2Sync(body.password, process.env.SECRET, 1000, 64, "sha512");
    const passHash = pass.toString('hex');
    if (user.password !== passHash) {
      throw new BadRequestException({
        status: 400,
        error: lang["EN"].email_already_used,
      }, "400");

    }
    const token = await jwt.sign({ id: user.id, role: user.role });
    await usersRepository.updateOneById(user.id, { token: token });
    return { data: token };

  }

  public registration = async (body: RegistrationBody): Promise<any> => {
    const checkUser = await usersRepository.getUserByEmailOrUndefined(body.email);
    if (checkUser !== undefined) {
      throw new BadRequestException({
        status: 400,
        error: lang["EN"].email_already_used,
      }, "400");
    }
    const pass = await crypto.pbkdf2Sync(body.password, process.env.SECRET, 1000, 64, "sha512");
    const passHash = pass.toString('hex');
    const data = {
      username: body.username,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      role: body.role,
      status: UserStatuses.active,
      password: passHash,
      birthday: body.birthday,
      oldPassword: passHash,
    }
    const userId = await usersRepository.insertOne(data);
    const user = await usersRepository.getUserById(userId);
    const token = await jwt.sign({ id: user.id, role: user.role });
    await usersRepository.updateOneById(user.id, { token: token });
    return { data: token };
  };

  public forgotPassword = async (email: string): Promise<void> => {
    const user = await usersRepository.getUserByEmail(email);
    const pass = randomstring.generate({length: 16, charset: "alphanumeric"});
    const password = await crypto.pbkdf2Sync(pass, process.env.SECRET, 1000, 64, "sha512");
    const passHash = password.toString('hex');
    const token = await jwt.sign({ id: user.id, role: user.role });
    await usersRepository.updateOneById(user.id, { token: token, password: passHash });
    await mailer.sendForgotPasswordEmail(email,token);
  };


}



export const userService = new UserService();