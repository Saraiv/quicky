import { getRepository, Repository } from 'typeorm';

import IUsersTokenssRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokens from '../entities/UsersTokens';

class UsersTokenssRepository implements IUsersTokenssRepository {
  private ormRepository: Repository<UsersTokens>;

  constructor() {
    this.ormRepository = getRepository(UsersTokens);
  }

  public async findByToken(token: string): Promise<UsersTokens | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UsersTokens> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenssRepository;
