import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/', ensureAuthenticated, customersController.listAll);

customersRouter.get('/:id', ensureAuthenticated, customersController.show);

customersRouter.get(
  '/messages/:customer_id',
  ensureAuthenticated,
  customersController.showMessagesByCustomer
);

customersRouter.post('/', ensureAuthenticated, customersController.create);

customersRouter.put('/:id', ensureAuthenticated, customersController.update);

export default customersRouter;
