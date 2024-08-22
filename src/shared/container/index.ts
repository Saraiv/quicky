import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokenssRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokenssRepository',
  UsersTokenssRepository
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository
);
