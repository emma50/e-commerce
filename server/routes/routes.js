import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import responseTime from 'response-time';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';
import winston from '../config/winston';
import users from './users';
import items from './items';
import cart from './cart';
import order from './order';
import admin from './admin';

export default (app) => {
  const limiter = rateLimit({
    windowMs: 25 * 60 * 1000, // 25 minutes
    max: 400, // limit each IP to 100 requests per windowMs
  });
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(responseTime());
  app.use(limiter);
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
    res.status(200).json({
      status: 200,
      message: 'Welcome to E-commerce application',
      version: '1.0.0',
      author: 'Okwuidegbe Emmanuel',
      email: 'okwuidegbeemmauel@gmail.com',
      about: 'A simple E-commerce application.',
    });
  });
  app.use((req, res) => res.status(404).json({
    status: 404,
    message: 'Hello, page not found. Try connecting using an api testing application like POSTMAN',
  }));
};
