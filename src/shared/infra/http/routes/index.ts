import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import messagesRouter from '@modules/messages/infra/http/routes/messages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/customers', customersRoutes);
routes.use('/messages', messagesRouter);

export default routes;
