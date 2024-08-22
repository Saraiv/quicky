import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import SessionsController from '../controllers/SessionsController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const sessionsController = new SessionsController();

usersRouter.post(
  '/',
  usersController.create
);

usersRouter.get(
  '/:id/active',
  celebrate({
    [Segments.QUERY]: {
      token: Joi.string().required(),
    },
  }),
  usersController.active
);

usersRouter.get('/', ensureAuthenticated, usersController.listAll);

usersRouter.get('/:id', ensureAuthenticated, usersController.showById);

usersRouter.get('/name/:name', ensureAuthenticated, usersController.showByName);

usersRouter.put('/:id', ensureAuthenticated, usersController.update);

usersRouter.delete('/:id', ensureAuthenticated, usersController.delete);

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      data: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).required(),
    },
  }),
  sessionsController.create
);
export default usersRouter;
