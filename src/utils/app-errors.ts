/**
 * Application operational errors
 */
import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number, isOperational: boolean) {

    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {

    super(message, 401, true);

  }
}

export class AuthorizationError extends AppError {
  constructor() {
    super("Permission denied", 403, true);
  }
}

export class RequestError extends AppError {
  validationError: any;
  constructor(message: string, validationError?: any) {
    super(message, HttpStatus.BAD_REQUEST, true);
    this.validationError = validationError;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, true);
  }
}

export class ServerError extends AppError {
  constructor(message: string) {
    super(message, 500, false);
  }
}
