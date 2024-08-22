import { getRepository, Repository, Like } from 'typeorm';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import ICreateMessagesDTO from '@modules/messages/dtos/ICreateMessageDTO';
import ISearchParamsDTO from '@shared/dtos/ISearchParamsDTO';
import Messages from '../entities/MessageEntity';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Messages>;

  constructor() {
    this.ormRepository = getRepository(Messages);
  }

  public async findById(id: string): Promise<Messages | undefined> {
    const messages = await this.ormRepository.findOne(id);

    return messages;
  }

  public async findAllMessages(params: ISearchParamsDTO): Promise<Messages[]> {
    const order = params.orderBy ?? { sort: 'created_by', order: 'ASC' };
    const limit = params.limit ?? 20;
    const page = params.page ?? 1;

    const where = {} as { [key: string]: any };

    if (params.query) {
      where.message = Like(`%${params.query}%`);
    }

    const messages = await this.ormRepository
      .createQueryBuilder('messages')
      .where(where)
      .orderBy(order.sort, order.order)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return messages;
  }

  public async create(messageData: ICreateMessagesDTO): Promise<Messages> {
    const project = this.ormRepository.create(messageData);

    await this.ormRepository.save(project);

    return project;
  }

  public async save(message: Messages): Promise<Messages> {
    return this.ormRepository.save(message);
  }
}

export default MessagesRepository;
