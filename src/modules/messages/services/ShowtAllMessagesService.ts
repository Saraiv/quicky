import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';

import Messages from '../infra/typeorm/entities/MessageEntity';

@injectable()
class ShowAllMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(params: ISearchParamsDTO): Promise<Messages[]> {
    const messages = await this.messagesRepository.findAllMessages(params);

    if (!messages) {
      throw new AppError('Message not found!');
    }

    return messages;
  }
}
export default ShowAllMessagesService;
