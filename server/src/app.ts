import express, { ErrorRequestHandler } from 'express';
import debug from 'debug';
import baseRouter from './routes/base';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import adminRouter from './routes/admin';
import Image from './models/admin/Image';

const app = express();
app.disable('x-powered-by');

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send({
    user: res.locals.user,
    error: 1,
    message: err.message,
  });
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
app.use('/admin', adminRouter);
app.use('/', baseRouter);
app.use(errorHandler);
app.listen(3000, function () {
  console.log('listening');
});
