export * from 'express';
import { Details } from 'express-useragent';

import { LoggedUser } from '@core/auth.service';

declare global {
  namespace Express {
    interface Request {
      transaction: string;
      useragent: Details;
      user?: LoggedUser;
    }
  }
}
