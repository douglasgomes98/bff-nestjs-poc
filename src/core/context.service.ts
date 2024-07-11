import { Injectable } from '@nestjs/common';
import { Details } from 'express-useragent';

import { LoggedUser } from './auth.service';

@Injectable()
export class ContextService {
  private transaction: string;
  private useragent: Details;
  private user: LoggedUser | null;

  setTransaction(transaction: string) {
    this.transaction = transaction;
  }

  setUseragent(useragent: Details) {
    this.useragent = useragent;
  }

  setUser(user: LoggedUser) {
    this.user = user;
  }

  getTransaction(): string {
    return this.transaction;
  }

  getUseragent(): Details {
    return this.useragent;
  }

  getUser(): LoggedUser | null {
    return this.user;
  }
}
