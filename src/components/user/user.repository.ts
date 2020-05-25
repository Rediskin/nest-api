import { DeepPartial, getRepository } from 'typeorm';
import { User } from './user.entities';
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

}

export const usersRepository = new UsersRepository();