import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customers from '../infra/typeorm/entities/CustomerEntity';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

@injectable()
class CreateCustomersService {
  constructor(
    @inject('CustomersRepository')
    private CustomersRepository: ICustomersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: ICreateCustomerDTO): Promise<Customers> {
    const customer = await this.CustomersRepository.create(data);

    await this.cacheProvider.invalidatePrefix('Customers-list');
    return customer;
  }
}
export default CreateCustomersService;
