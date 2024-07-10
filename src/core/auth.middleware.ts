import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      next();
      return;
    }

    try {
      const user = await this.authService.validateToken(token);
      request['user'] = user;
    } catch {}

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
