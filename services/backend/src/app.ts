import { Hono } from 'hono';
import { errorHandler } from './utils/errors';
import { userRouter } from './features/user/user.routes';

export const app = new Hono();

app.onError(errorHandler);

app.route('/users', userRouter);
app.get('/', (c) => {
  return c.text('Hello Hono!');
});
