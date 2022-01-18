import express, { ErrorRequestHandler } from 'express';
import debug from 'debug';
import router from './routes/base';
import User from './models/user';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();
app.disable('x-powered-by');

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401).send(err.message);
};

app.use(
  express.json({
    strict: true,
    limit: '1mb',
  })
);
app.use(cookieParser());
app.use(
  helmet({
    referrerPolicy: {
      policy: 'strict-origin',
    },
  })
);
app.use('/', router);
app.use(errorHandler);
app.listen(3000, function () {
  console.log('listening');
});
