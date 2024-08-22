import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';

import MessageEntity from '@modules/messages/infra/typeorm/entities/MessageEntity';

interface ShowAllMessagesByCustomerServiceParams {
  customer_id: string;
}

@injectable()
class ShowAllMessagesByCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(params: ShowAllMessagesByCustomerServiceParams): Promise<MessageEntity[]> {
    const messages = await this.customersRepository.showMessagesByCustomer(params.customer_id);

    if (!messages) {
      throw new AppError('Customer not found!');
    }

    return messages;
  }
}
export default ShowAllMessagesByCustomerService;
