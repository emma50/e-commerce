import express from 'express';
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

process.on('unhandledRejection', (e) => {
  console.log(e);
});

const port = process.env.PORT || envPort;

winston.info(`Server Running on port ${port}`);
const server = app.listen(port);

export default server;
