import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListAllCustomersService from '@modules/customers/services/ShowtAllCustomersService';
import ShowCustomersService from '@modules/customers/services/ShowCustomersService';
import CreateCustomersService from '@modules/customers/services/CreateCustomersService';
import UpdateCustomersService from '@modules/customers/services/UpdateCustomersService';
import { requestQueryToSearchParams } from '@shared/dtos/ISearchParamsDTO';
import ShowAllMessagesByCustomerService from '@modules/customers/services/ShowAllMessagesByCustomerService';

export default class CustomersController {
  public async listAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listCustomers = container.resolve(ListAllCustomersService);

    const params = requestQueryToSearchParams(request.query);

    const Customers = await listCustomers.execute(params);

    return response.json({ data: classToClass(Customers) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const customerServ = container.resolve(ShowCustomersService);

    const customer = await customerServ.execute({ id: String(id) });

    return response.json({ data: classToClass(customer) });
  }

  public async showMessagesByCustomer(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { customer_id } = request.params;

    const customerServ = container.resolve(ShowAllMessagesByCustomerService);

    const customer = await customerServ.execute({
      customer_id: String(customer_id),
    });

    return response.json({ data: classToClass(customer) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      address,
      number,
      created_at,
      updated_at,
      status,
    } = request.body.data;

    const createCustomersServ = container.resolve(CreateCustomersService);
    const Customers = await createCustomersServ.execute({
      name,
      email,
      phone,
      address,
      number,
      created_at,
      updated_at,
      status,
    });

    return response.json({ data: classToClass(Customers) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      address,
      number,
      created_at,
      updated_at,
      status,
    } = request.body.data;

    const updateCustomerService = container.resolve(UpdateCustomersService);
    const Parts = await updateCustomerService.execute({
      id: String(id),
      name,
      email,
      phone,
      address,
      number,
      created_at,
      updated_at,
      status,
    });

    return response.json({ data: classToClass(Parts) });
  }
}
