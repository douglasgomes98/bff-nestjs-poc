import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  AGENCIES_PACKAGE_NAME,
  AGENCIES_SERVICE_NAME,
  AgenciesServiceClient,
} from './generated/agencies';

@Injectable()
export class AgenciesGRPCClient implements OnModuleInit {
  private service: AgenciesServiceClient;

  constructor(
    @Inject(AGENCIES_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<AgenciesServiceClient>(
      AGENCIES_SERVICE_NAME,
    );
  }

  getMethods() {
    return this.service;
  }
}
