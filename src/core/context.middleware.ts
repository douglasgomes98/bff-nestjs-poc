import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ContextService } from './context.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const transaction = await this.createTransactionId();

    request.transaction = transaction;
    response.header('transaction', transaction);

    this.contextService.setTransaction(transaction);
    this.contextService.setUseragent(request.useragent);

    next();
  }

  private async createTransactionId(): Promise<string> {
    const nanoid = await import('nanoid');
    return nanoid.customAlphabet('1234567890abcdefefghijklmnopqrstuvxz', 15)();
  }
}
