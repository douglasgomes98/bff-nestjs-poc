import { Injectable } from '@nestjs/common';

import { UsersDataSourceGRPC } from 'src/adapters/users-grpc.data-source';
import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
} from 'src/grpc/generated/users';

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
