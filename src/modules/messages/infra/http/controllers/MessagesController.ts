import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListAllMessagesService from '@modules/messages/services/ShowtAllMessagesService';
import ShowMessagesService from '@modules/messages/services/ShowMessagesService';
import CreateMessagesService from '@modules/messages/services/CreateMessagesService';
import UpdateMessagesService from '@modules/messages/services/UpdateMessagesService';
import { requestQueryToSearchParams } from '@shared/dtos/ISearchParamsDTO';
import ShowMessageByToUser from '@modules/messages/services/ShowMessagesByToUser';
import ShowMessageByFromUser from '@modules/messages/services/ShowMessagesByFromUser';

export default class MessagesController {
  public async listAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listMessages = container.resolve(ListAllMessagesService);

    const params = requestQueryToSearchParams(request.query);

    const Messages = await listMessages.execute(params);

    return response.json({ data: classToClass(Messages) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const messageServ = container.resolve(ShowMessagesService);

    const message = await messageServ.execute({ id: String(id) });

    return response.json({ data: classToClass(message) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { message, from_user_id, to_user_id, customer_id } =
      request.body.data;

    const createMessagesServ = container.resolve(CreateMessagesService);
    const Messages = await createMessagesServ.execute({
      message,
      from_user_id,
      to_user_id,
      customer_id,
    });

    return response.json({ data: classToClass(Messages) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { message, from_user_id, to_user_id, customer_id } =
      request.body.data;

    const updateMessageService = container.resolve(UpdateMessagesService);
    const Parts = await updateMessageService.execute({
      id: String(id),
      message,
      from_user_id,
      to_user_id,
      customer_id,
    });

    return response.json({ data: classToClass(Parts) });
  }

  public async showMessagestoUser(request: Request, response: Response): Promise<Response>{
    const { to_user_id } = request.params;
    const show_message_by_to_user = container.resolve(ShowMessageByToUser);
    const messages = await show_message_by_to_user.execute({to_user_id}); 
    return response.json(messages);
  }

  public async showMessagesFromUser(request: Request, response: Response): Promise<Response>{
    const { from_user_id } = request.params;
    const show_message_from_to_user = container.resolve(ShowMessageByFromUser);
    const messages = await show_message_from_to_user.execute({from_user_id});
    return response.json(messages);
  }
}
