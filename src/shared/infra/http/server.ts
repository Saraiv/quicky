import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';

import * as http from 'http';
import * as https from 'https';

import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = process.env.PORT ?? 3334;

app.use(cors());

app.use(express.json({ limit: '250mb' }));
app.use(
  express.urlencoded({
    limit: '250mb', // /////// LIMIT for URL ENCODE (image data)
    extended: true,
  })
);

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      data: {
        status: 'error',
        message: err.message,
      },
    });
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  return response.status(500).json({
    data: {
      status: 'error',
      message: err.message,
    },
  });
});

if (process.env.USE_SSL !== 'true') {
  http.createServer(app).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}!`);
  });
} else {
  const options = {
    key: fs.readFileSync(process.env.PRIVATE_KEY ?? ''),
    cert: fs.readFileSync(process.env.CERTIFICATE_KEY ?? ''),
  };
  https.createServer(options, app).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server https started on port ${port}!`);
  });
}
