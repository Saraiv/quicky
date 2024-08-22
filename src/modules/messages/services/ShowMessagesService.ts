import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRequestById from '@shared/dtos/IRequestByIdDTO';
import IMessagesRepository from '../repositories/IMessagesRepository';

import Messages from '../infra/typeorm/entities/MessageEntity';

@injectable()
class ShowMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(data: IRequestById): Promise<Messages> {
    const messages = await this.messagesRepository.findById(data.id);

    if (!messages) {
      throw new AppError('Message not found!');
    }

    return messages;
  }
}
export default ShowMessagesService;
