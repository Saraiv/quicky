import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/UserEntity';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

@injectable()
class UpdateUserService {
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

  public async execute(data: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError('User not found!');
    }

    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.status = data.status;
    user.address = data.address;
    user.number = data.number;
    user.avatar =
      data.avatar && data.avatar.includes(';base64')
        ? await this.storageProvider.saveBase64ToFile(data.avatar)
        : user.avatar.replace(
            new RegExp(process.env.BUCKET_ENDPOINT ?? '', 'g'),
            ''
          );

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
