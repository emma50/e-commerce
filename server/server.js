import express from 'express';
import 'airbnb-browser-shims';
import routes from './routes/routes';
import winston from 'winston';

const app = express();

routes(app);

process.on('unhandledRejection', (e) => {
  console.log('Something went wrong');
});

const port = process.env.PORT || 3000;
winston.info(`Server Running on port ${port}`);
const server = app.listen(port);

export default server;
