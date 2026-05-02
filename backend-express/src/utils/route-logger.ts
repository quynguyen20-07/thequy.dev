import { Express } from 'express';

export const logRoutes = (app: Express) => {
  const timestamp = new Date().toLocaleString();
  const reset = '\x1b[0m';
  const yellow = '\x1b[33m';
  const green = '\x1b[32m';

  console.log(`[Express] ${timestamp}  LOG [RoutesResolver] Initializing API Routes...`);

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Direct routes on the app
      const path = middleware.route.path;
      const methods = Object.keys(middleware.route.methods).map(m => m.toUpperCase());
      methods.forEach(method => {
        console.log(
          `[Express] ${timestamp}  LOG [RouterExplorer] Mapped {${path}, ${green}${method}${reset}} route`
        );
      });
    } else if (middleware.name === 'router') {
      // Routes on routers (if any)
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          const path = handler.route.path;
          const methods = Object.keys(handler.route.methods).map(m => m.toUpperCase());
          methods.forEach(method => {
            console.log(
              `[Express] ${timestamp}  LOG [RouterExplorer] Mapped {${path}, ${green}${method}${reset}} route`
            );
          });
        }
      });
    }
  });

  console.log(`[Express] ${timestamp}  LOG [RoutesResolver] API Routes initialized successfully${reset}`);
};
