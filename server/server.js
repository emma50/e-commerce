import express from 'express';
import 'express-async-errors';
import 'airbnb-browser-shims';
import routes from './routes/routes';
import winston from './config/winston';

const app = express();
let envPort;

routes(app);

if (process.env.NODE_ENV === 'test') {
  envPort = 3001;
} else {
  envPort = 3000;
}

const port = process.env.PORT || envPort;

winston.info(`Server Running on port ${port}`);
const server = app.listen(port);

export default server;
