import { Injectable, Scope } from '@nestjs/common';
import * as Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
} from 'src/grpc/generated/users';
import { UsersGRPCClient } from 'src/grpc/users.grpc-client';

@Injectable({ scope: Scope.REQUEST })
export class UsersDataSourceGRPC {
  private loader: Dataloader<string, GetUserResponse | null, string>;

  constructor(private readonly client: UsersGRPCClient) {
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
    return lastValueFrom(this.client.getMethods().GetUser(request));
  }

  listUsers(): Promise<ListUsersResponse> {
    return lastValueFrom(this.client.getMethods().ListUsers({}));
  }

  getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return this.loader.load(request.id);
  }
}
