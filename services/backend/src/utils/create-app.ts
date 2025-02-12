import { OpenAPIHono } from '@hono/zod-openapi';
import { AppError, errorHandler } from './errors';
import type {
  AppContext,
  AppOpenAPI,
  AppRouteHandler,
  AppRoutes,
} from '../types/app_context';
import { configureOpenAPI } from './configure-open-api';

export function createRouter(basePath: string) {
  const router = new OpenAPIHono<AppContext>({
    strict: false, // treat trailing slashes as the same route as no trailing slashes
    defaultHook: (result) => {
      if (!result.success) {
        throw new AppError('VALIDATION', {
          cause: result.target,
          message: result.error.errors.join(', '),
        });
      }
    },
  }).basePath(basePath);
  return router;
}

export function popoulateRouter<C extends object>(
  router: AppOpenAPI,
  routes: AppRoutes,
  controller: C,
) {
  Object.entries(routes).forEach(([name, route]) => {
    // popoulate the user router with the user routes;
    if (name in controller) {
      const handler = controller[name as keyof C] as AppRouteHandler<
        typeof route
      >;
      router.openapi(route, handler);
    } else {
      console.warn(
        `No controller found for route: "${route.path}" - ${route.method.toUpperCase()} - ${name}`,
      );
    }
  });
}

export function createApp(): AppOpenAPI {
  const app = createRouter('');

  configureOpenAPI(app);
  app.onError(errorHandler);
  return app;
}
