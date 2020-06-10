import { lang } from '../utils/lang';
import { userService, UserService } from "../components/user/user.service";
import { BadRequestException, Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware/nest-middleware.interface';

@Injectable()
export class Authenticate implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    // const authenticate = async (req: any, res: any, next: () => void): Promise<void> => {
      const publicUrls = [
        '/login',
        '/registration',
        '/forgotPassword',
      ];
      if (publicUrls.includes(req.baseUrl)) {
        next();
      } else {
        if (req.headers.authorization === undefined) {
            throw new BadRequestException({
              status: 401,
              error: lang["EN"].token_is_not_provided,
            }, "401");
        }
        const [, token] = req.headers.authorization.split(" ");
        let authUser;
        try {
          authUser = await userService.authenticateUser(token);
        } catch (error) {
            throw new BadRequestException({
              status: 401,
              error: lang["EN"].token_is_invalid,
            }, "401");
        }
        req.user = authUser;
        next();
      }
  }
}