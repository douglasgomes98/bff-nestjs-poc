import { Injectable } from '@nestjs/common';
import * as Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import { UsersGRPCClient } from 'src/grpc/users.grpc-client';
import { ListUsersResponse } from 'src/users/core/users.domain';

import { GetUserRequest, GetUserResponse } from '../core/users.domain';
import { convertUserToUserModel } from '../ports/users.converts';

@Injectable()
export class UsersDataSourceGRPC implements UsersDataSourceGRPC {
  private loader: Dataloader<string, GetUserResponse | null, string>;

  constructor(private readonly client: UsersGRPCClient) {
    this.loader = new Dataloader<string, GetUserResponse | null, string>(
      async (keys) => {
        const items = await Promise.all(
          keys.map((key) => this.getUser({ id: key })),
        );

        return keys.map(
          (key) => items.find((item) => item?.user?.id === key) || null,
        );
      },
    );
  }

  async listUsers(): Promise<ListUsersResponse> {
    const response = await lastValueFrom(this.client.ListUsers({}));

    return {
      users: response.users.map(convertUserToUserModel),
    };
  }

  getUserById(request: GetUserRequest): Promise<GetUserResponse> {
    return this.loader.load(request.id);
  }

  private async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const response = await lastValueFrom(this.client.GetUser(request));

    return {
      user: convertUserToUserModel(response.user),
    };
  }
}
