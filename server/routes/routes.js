import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import winston from '../config/winston';
import users from './users';
import items from './items';
import cart from './cart';

export default (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/items', items);
  app.use('/api/v1/cart', cart);
};
