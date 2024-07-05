import { Injectable } from '@nestjs/common';

import { UsersDataSourceGRPC } from '@adapters/users-grpc.data-source';
import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
} from '@grpc/generated/users';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: UsersDataSourceGRPC) {}

  async listUsers(): Promise<ListUsersResponse> {
    return this.dataSource.listUsers();
  }

  async getUserById({ id }: GetUserRequest): Promise<GetUserResponse> {
    return this.dataSource.getUser({ id });
  }
}
