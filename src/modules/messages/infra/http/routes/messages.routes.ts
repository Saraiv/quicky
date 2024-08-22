import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/', ensureAuthenticated, messagesController.listAll);

messagesRouter.get('/:id', ensureAuthenticated, messagesController.show);

messagesRouter.get('to/:to_user_id', messagesController.showMessagestoUser)

messagesRouter.post('/', ensureAuthenticated, messagesController.create);

messagesRouter.put('/:id', ensureAuthenticated, messagesController.update);

export default messagesRouter;
