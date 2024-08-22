import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customers from '../infra/typeorm/entities/CustomerEntity';
import IUpdateCustomerDTO from '../dtos/IUpdateCustomerDTO';

@injectable()
class UpdateCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(data: IUpdateCustomerDTO): Promise<Customers> {
    const customer = await this.customersRepository.findById(data.id);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return this.customersRepository.save(data);
  }
}

export default UpdateCustomersService;
