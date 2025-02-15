import userRouter from './features/user/user.router';
import vocabularyRouter from './features/vocabulary/vocabulary.router';
import type { AppOpenAPI } from './types/app_context';
import { createApp } from './utils/create-app';

export const app = createApp();

const routers = [userRouter, vocabularyRouter] as const satisfies AppOpenAPI[];

routers.forEach((router) => {
  app.route('/', router);
});

export type AppType = (typeof routers)[number];
