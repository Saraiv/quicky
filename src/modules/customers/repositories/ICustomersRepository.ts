import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import Customers from '../infra/typeorm/entities/CustomerEntity';
import ICreateCustomersDTO from '../dtos/ICreateCustomerDTO';
import IUpdateCustomerDTO from '../dtos/IUpdateCustomerDTO';
import MessageEntity from '@modules/messages/infra/typeorm/entities/MessageEntity';

export default interface ICustomersRepository {
  findAllCustomers(params: ISearchParamsDTO): Promise<Customers[]>;
  findById(id: string): Promise<Customers | undefined>;
  create(data: ICreateCustomersDTO): Promise<Customers>;
  save(Customers: IUpdateCustomerDTO): Promise<Customers>;
  showMessagesByCustomer(customer_id: string): Promise<MessageEntity[]>;
}
