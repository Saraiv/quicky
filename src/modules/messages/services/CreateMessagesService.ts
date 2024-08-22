import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';

import Messages from '../infra/typeorm/entities/MessageEntity';
import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

@injectable()
class CreateMessagesService {
  constructor(
    @inject('MessagesRepository')
    private MessagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: ICreateMessageDTO): Promise<Messages> {
    const message = await this.MessagesRepository.create(data);

    await this.cacheProvider.invalidatePrefix('Messages-list');
    return message;
  }
}
export default CreateMessagesService;
