import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import ShowUserByIdService from '@modules/users/services/ShowUserByIdService';

export interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload; // forçando type de variável

    const getUser = container.resolve(ShowUserByIdService);

    getUser
      .execute(sub)
      .then((user) => {
        request.user = user;
        return next();
      })
      .catch(() => {
        throw new AppError('Invalid JWT Token', 401);
      });
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
