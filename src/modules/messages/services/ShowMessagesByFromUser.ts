import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';

import Messages from '../infra/typeorm/entities/MessageEntity';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';

@injectable()
class ShowMessageByFromUser {
  constructor(
    @inject('MessagesRepository')
    private MessagesRepository: IMessagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: ISearchParamsDTO): Promise<Messages[]> {
    const cache_key = `messages-from-user:${JSON.stringify(data)}` ;
    let messages = await this.cacheProvider.recover<Messages[]>(cache_key);
    if(!messages){
	messages = await this.MessagesRepository.findAllMessages(data); 
	await this.cacheProvider.save(cache_key, messages)
    }
    return messages;
  }
}
export default ShowMessageByFromUser;
