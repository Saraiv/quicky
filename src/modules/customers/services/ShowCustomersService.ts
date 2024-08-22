import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRequestById from '@shared/dtos/IRequestByIdDTO';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customers from '../infra/typeorm/entities/CustomerEntity';

@injectable()
class ShowCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(data: IRequestById): Promise<Customers> {
    const customers = await this.customersRepository.findById(data.id);

    if (!customers) {
      throw new AppError('Customer not found!');
    }

    return customers;
  }
}
export default ShowCustomersService;
