import Users from '../infra/typeorm/entities/UserEntity';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';

export default interface IUsersRepository {
  findAllUsers(params: ISearchParamsDTO): Promise<Users[]>;
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  findByDocument(document: string): Promise<Users | undefined>;
  findByName(name: string): Promise<Users[]>;
  create(data: ICreateUserDTO): Promise<Users>;
  save(user: IUpdateUserDTO): Promise<Users>;
}
