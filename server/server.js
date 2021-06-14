import express from 'express';
import 'airbnb-browser-shims';
import winston from 'winston'

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to E-Commerce');
});

const port = process.env.PORT || 3000;
winston.info(`Server Running on port ${port}`);
const server = app.listen(port);

export default server;
