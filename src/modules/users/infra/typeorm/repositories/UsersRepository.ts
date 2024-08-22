import { getRepository, Like, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Users from '@modules/users/infra/typeorm/entities/UserEntity';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
// import { nodeModuleNameResolver } from 'typescript';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id, {});

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByDocument(document: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: { document },
    });

    return user;
  }

  public async findByName(name: string): Promise<Users[]> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('UPPER(user.name) like UPPER(:name) and user.status = :status', {
        name: `%${name}%`,
        status: 1,
      })
      .orderBy('user.name', 'ASC')
      .getMany();

    return user;
  }

  public async findAllUsers(params: ISearchParamsDTO): Promise<Users[]> {
    const order = params.orderBy ?? { sort: 'name', order: 'ASC' };
    const limit = params.limit ?? 20;
    const page = params.page ?? 1;

    const where = {} as { [key: string]: any };

    if (params.query) {
      where.name = Like(`%${params.query}%`);
    }

    if (params.fields) {
      params.fields.forEach((field) => {
        where[field.field] = field.value;
      });
    }
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .where(where)
      .orderBy(order.sort, order.order)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUpdateUserDTO): Promise<Users> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
