import { injectable } from 'tsyringe';

import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenssRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
}

@injectable()
class ActiveUserService {
  constructor(
    // @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    // @inject('UsersTokenssRepository')
    private userTokensRepository: IUsersTokenssRepository,

    // @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token }: IRequest): Promise<User> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.status === 1) {
      throw new AppError('User is already active!');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired');
    }

    user.status = 1;

    return this.usersRepository.save(user);
  }
}

export default ActiveUserService;
