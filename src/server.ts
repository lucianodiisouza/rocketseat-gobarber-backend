import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import './database';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// stats route
app.get('/', (req, res) => {
  return res.json({ serverStatus: 'running...' });
});

app.listen(3333),
  () => {
    console.log('🚀 launched..');
  };
