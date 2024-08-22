import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ActiveUserService from '@modules/users/services/ActiveUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowUserByIdService from '@modules/users/services/ShowUserByIdService';
import ShowUserByNameService from '@modules/users/services/ShowUserByNameService';
import { requestQueryToSearchParams } from '@shared/dtos/ISearchParamsDTO';
import EUserProfile from '@modules/users/enums/euser_profile';
// import SendActiveUserAccountEmailService from '@modules/users/services/SendActiveUserAccountEmailService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone, address, number, avatar, status } =
      request.body.data;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
      address,
      number,
      avatar,
      status,
    });

    return response.json({ data: classToClass(user) });
  }

  public async showById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserByIdService);

    const user = await showUser.execute(String(id));

    return response.json({ data: classToClass(user) });
  }

  public async showByName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name } = request.params;

    const showUser = container.resolve(ShowUserByNameService);

    const user = await showUser.execute(String(name));

    return response.json({ data: classToClass(user) });
  }

  public async listAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const params = requestQueryToSearchParams(request.query);

    const users = await listUsers.execute(params);

    return response.json({ data: classToClass(users) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, phone, address, number, avatar, status } =
      request.body.data;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id: String(id),
      name,
      email,
      password,
      phone,
      address,
      number,
      avatar,
      status,
    });

    return response.json({ data: classToClass(user) });
  }

  public async active(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const activeUser = container.resolve(ActiveUserService);

    const user = await activeUser.execute({
      token: String(token),
    });

    return response.json({ data: classToClass(user) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user?.id ?? '';
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      user_id,
      id: String(id),
    });

    return response.json({ data: classToClass(user) });
  }
}
