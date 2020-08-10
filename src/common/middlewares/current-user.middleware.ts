import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies.session) {
      return next();
    }
    try {
      const payload = verify(
        req.cookies.session.jwt,
        process.env.JWT_KEY!,
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
    next();
  }
}
