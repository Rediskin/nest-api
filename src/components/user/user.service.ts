import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginBody, RegistrationBody } from './user.dtos';
import * as crypto from 'crypto';
import { jwt } from '../../utils/jwt';
import { usersRepository } from './user.repository';
import { AuthorizationError, RequestError } from '../../utils/app-errors';
import { User, UserStatuses } from './user.entities';
import { lang } from '../../utils/lang';
import { isEmail } from 'class-validator';

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
      birthday: body.birthday
    }
    const userId = await usersRepository.insertOne(data);
    const user = await usersRepository.getUserById(userId);
    const token = await jwt.sign({ id: user.id, role: user.role });
    await usersRepository.updateOneById(user.id, { token: token });
    return { data: token };
  };
}



export const userService = new UserService();