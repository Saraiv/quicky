import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(document: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(document);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
export default ShowUserByIdService;
