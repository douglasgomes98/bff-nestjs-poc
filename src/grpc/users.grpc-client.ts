import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from './generated/users';

@Injectable()
export class UsersGRPCClient implements OnModuleInit {
  private service: UsersServiceClient;

  constructor(
    @Inject(USERS_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  getMethods() {
    return this.service;
  }
}
