import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customers from '../infra/typeorm/entities/CustomerEntity';

@injectable()
class ShowAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(params: ISearchParamsDTO): Promise<Customers[]> {
    const customers = await this.customersRepository.findAllCustomers(params);

    if (!customers) {
      throw new AppError('Customer not found!');
    }

    return customers;
  }
}
export default ShowAllCustomersService;
