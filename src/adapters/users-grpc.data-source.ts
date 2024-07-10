import { Injectable, Scope } from '@nestjs/common';
import Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import { ContextService } from '@core/context.service';
import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
} from '@grpc/generated/users';
import { UsersGRPCClient } from '@grpc/users.grpc-client';

import { DataSourceGRPC } from './grpc.data-source';

@Injectable({ scope: Scope.REQUEST })
export class UsersDataSourceGRPC extends DataSourceGRPC {
  private loader: Dataloader<string, GetUserResponse | null, string>;

  constructor(
    private readonly client: UsersGRPCClient,
    contextService: ContextService,
  ) {
    super(contextService);
    this.loader = new Dataloader<string, GetUserResponse | null, string>(
      async (keys) => {
        const items = await Promise.all(
          keys.map((key) => this.getUserById({ id: key })),
        );

        return keys.map(
          (key) => items.find((item) => item?.user?.id === key) || null,
        );
      },
    );
  }

  private getUserById(request: GetUserRequest): Promise<GetUserResponse> {
    return lastValueFrom(
      this.client.getMethods().GetUser(request, this.createMetadata()),
    );
  }

  listUsers(): Promise<ListUsersResponse> {
    return lastValueFrom(
      this.client.getMethods().ListUsers({}, this.createMetadata()),
    );
  }

  getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return this.loader.load(request.id);
  }
}
