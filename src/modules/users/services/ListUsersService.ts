import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(params: ISearchParamsDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers(params);

    return users;
  }
}
export default ListUsersService;
