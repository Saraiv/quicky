import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';

import Messages from '../infra/typeorm/entities/MessageEntity';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';

@injectable()
class ShowMessageByToUser {
  constructor(
    @inject('MessagesRepository')
    private MessagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: ISearchParamsDTO): Promise<Messages[]> {
    const cacheKey = `messages-to-user:${JSON.stringify(data)}`;
    
    let messages = await this.cacheProvider.recover<Messages[]>(cacheKey);

    if (!messages) {
      messages = await this.MessagesRepository.findAllMessages(data);
      await this.cacheProvider.save(cacheKey, messages);
    }

    return messages;
  }
}
export default ShowMessageByToUser;
