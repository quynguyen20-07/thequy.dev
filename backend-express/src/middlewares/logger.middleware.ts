import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url } = req;
  const timestamp = new Date().toLocaleString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const color = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m'; // Red for errors, Green for success
    const reset = '\x1b[0m';
    
    console.log(
      `[Express] ${timestamp}  LOG [RouterExplorer] ${color}${method}${reset} {${url}, ${color}${statusCode}${reset}} +${duration}ms`
    );
  });

  next();
};
