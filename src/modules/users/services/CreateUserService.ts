import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/UserEntity';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  number: string;
  state: string;
  avatar: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    name,
    email,
    password,
    address,
    number,
    avatar,
    status,
    phone
  }: ICreateUserDTO): Promise<User> {
    let avatar_modif = '';

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    if (avatar && avatar.includes(';base64')) {
      avatar_modif = await this.storageProvider.saveBase64ToFile(avatar);
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      number,
      avatar: avatar_modif,
      status,
    });

    await this.cacheProvider.invalidatePrefix('user-list');
    return user;
  }
}
export default CreateUserService;
