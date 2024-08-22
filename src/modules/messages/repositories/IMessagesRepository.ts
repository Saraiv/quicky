import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import Messages from '../infra/typeorm/entities/MessageEntity';
import ICreateMessagesDTO from '../dtos/ICreateMessageDTO';
import IUpdateMessageDTO from '../dtos/IUpdateMessageDTO';

export default interface IMessagesRepository {
  findAllMessages(params: ISearchParamsDTO): Promise<Messages[]>;
  findById(id: string): Promise<Messages | undefined>;
  create(data: ICreateMessagesDTO): Promise<Messages>;
  save(Messages: IUpdateMessageDTO): Promise<Messages>;
}
