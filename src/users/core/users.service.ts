import { Inject, Injectable } from '@nestjs/common';

import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
  USERS_DATA_SOURCE_NAME,
  UsersDataSource,
} from './users.domain';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_DATA_SOURCE_NAME)
    private readonly dataSource: UsersDataSource,
  ) {}

  async listUsers(): Promise<ListUsersResponse> {
    return this.dataSource.listUsers();
  }

  async getUserById({ id }: GetUserRequest): Promise<GetUserResponse> {
    return this.dataSource.getUserById({ id });
  }
}
