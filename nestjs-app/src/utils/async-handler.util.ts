import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AsyncHandler implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction, fn: Function) {
    fn(req, res, next).catch(next);
  }
}
