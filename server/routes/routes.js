import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';
import winston from '../config/winston';
import users from './users';
import items from './items';
import cart from './cart';
import order from './order';
import admin from './admin';

export default (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/items', items);
  app.use('/api/v1/cart', cart);
  app.use('/api/v1/order', order);
  app.use('/api/v1/users', admin);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1$', (req, res) => {
    res.status(200).json({ status: 200, message: 'Welcome to E-commerce application', version: '1.0.0' });
  });
  app.use((req, res) => res.status(404).json({ status: 404, message: 'Hello, page not found' }));
};
