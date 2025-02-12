import { userRouter } from './features/user/user.router';
import type { AppOpenAPI } from './types/app_context';
import { createApp } from './utils/create-app';

export const app = createApp();

const routers: AppOpenAPI[] = [userRouter] as const;
routers.forEach((router) => {
  app.route('/', router);
});

export type AppType = (typeof routers)[number];
