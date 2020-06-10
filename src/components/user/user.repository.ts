import { DeepPartial, getRepository } from 'typeorm';
import { User, UserRoles } from './user.entities';
import { NotFoundError, RequestError } from '../../utils/app-errors';
import { lang } from '../../utils/lang';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BadRequestException } from '@nestjs/common';

export class UsersRepository {

  public insertOne = async (data: DeepPartial<User>): Promise<number> => {
    const result = await getRepository(User).insert(data);
    return result.identifiers[0].id;
  };

  public updateOneById = async (userId: number, data: QueryDeepPartialEntity<User>): Promise<void> => {
    const result = await getRepository(User).update({id: userId}, data);
    if (result.raw.affectedRows !== 1) {
      throw new BadRequestException({
        status:404,
        error: lang["EN"].user_not_found,
      }, "404");
    }
  };

  public getUserById = async (id: number): Promise<User> => {
    const result = await getRepository(User)
      .createQueryBuilder("users")
      .where("users.id = :id", {id: id})
      .getOne();
    if (result === undefined) {
      throw new BadRequestException({
        status:400,
        error: lang["EN"].user_not_found,
      }, "400");
    }
    return result;
  };

  public getUserPublicData = async (id: number): Promise<any> => {
    const result = await getRepository(User)
      .createQueryBuilder("users")
      .where("users.id = :id", {id: id})
      .getOne();
    if (result === undefined) {
      throw new BadRequestException({
        status:400,
        error: lang["EN"].user_not_found,
      }, "400");
    }
    return {
      id: result.id,
      username: result.username,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      role: result.role,
      birthday: result.birthday,
      gender: result.gender,
      createdAt: result.createdAt
    };
  };

  public getUserByEmail = async (email: string): Promise<User> => {
    const result = await getRepository(User)
      .createQueryBuilder("users")
      .where("users.email = :email", {email: email})
      .getOne();
    // const result = await getRepository(User).findOne({where: {email: email}});
    if (result === undefined) {
      throw new BadRequestException({
        status:400,
        error: lang["EN"].user_not_found,
      }, "400");
    }
    return result;
  };

  public getUserByEmailOrUndefined = async (email: string): Promise<any> => {
    return await getRepository(User)
      .createQueryBuilder("users")
      .where("users.email = :email", {email: email})
      .getOne();
  };

  public async getUserTokenByUserId(userId: number): Promise<any> {
    const user = await getRepository(User)
      .createQueryBuilder("users")
      .where("users.id = :id", {id: userId})
      .getOne();
    if (user === undefined) {
      throw new NotFoundError(lang["DE"].user_not_found);
    }
    return {
      thisOne: {
        id: user.id,
        role: user.role
      },
      token: user.token
    };
  };



  public getAdminById = async (id: number): Promise<User> => {
    const result = await getRepository(User)
      .createQueryBuilder("users")
      .where("users.id = :id and users.role = :role", {id: id, role: UserRoles.admin})
      .getOne();
    if (result === undefined) {
      throw new BadRequestException({
        status:400,
        error: lang["EN"].admin_not_found,
      }, "400");
    }
    return result;
  };

  public getUserList = async (): Promise<any> =>{
    const result = await getRepository(User).find();
    return result.map((item) => {
      return {
        id: item.id,
        username: item.username,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role,
        birthday: item.birthday,
        gender: item.gender,
        createdAt: item.createdAt
      };
    });
  }
}

export const usersRepository = new UsersRepository();