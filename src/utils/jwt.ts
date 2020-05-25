const jsonwebtoken = require("jsonwebtoken");

import { lang } from "./lang";
import { AuthenticationError } from "./app-errors";

export interface Token {
  id: string;
  iat: number;
}

/**
 * hwt service for singning and verifying jwt token
 */
export class Jwt {
  /**
   * sings jwt token
   * @param payload
   */
  public sign(payload: string | object | Buffer): Promise<string> {
    if (process.env.SECRET === undefined) {
      throw new Error(lang["DE"].SECRET_environment_variable_is_undefined);
    }

    return new Promise((resolve, reject): void => {
      jsonwebtoken.sign(payload, process.env.SECRET!, (err, token) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(token);
      });
    });
  }

  /**
   * verifies jwt token
   * @param token
   */
  public verify(token: string): Promise<Token> {
    if (process.env.SECRET === undefined) {
      throw new Error(lang["EN"].SECRET_environment_variable_is_undefined);
    }

    return new Promise((resolve, reject): void => {
      jsonwebtoken.verify(token, process.env.SECRET!, (err, decoded) => {
        if (err) {
          reject(new AuthenticationError(lang["EN"].token_is_invalid));
          return;
        }

        resolve(decoded as Token);
      });
    });
  }
}

export const jwt = new Jwt();
