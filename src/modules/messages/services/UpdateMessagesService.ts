import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';
import Messages from '../infra/typeorm/entities/MessageEntity';
import IUpdateMessageDTO from '../dtos/IUpdateMessageDTO';

@injectable()
class UpdateMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(data: IUpdateMessageDTO): Promise<Messages> {
    const message = await this.messagesRepository.findById(data.id);

    if (!message) {
      throw new AppError('Message not found!');
    }

    return this.messagesRepository.save(data);
  }
}

export default UpdateMessagesService;
