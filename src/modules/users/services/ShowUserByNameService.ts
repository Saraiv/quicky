import { injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowUserByNameService {
  constructor(
    // @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(name: string): Promise<User[]> {
    const users = await this.usersRepository.findByName(name);

    if (!users) {
      throw new AppError(`No user found with the name "${name}"`);
    }

    return users;
  }
}
export default ShowUserByNameService;
