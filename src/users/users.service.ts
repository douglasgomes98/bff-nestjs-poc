import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as DataLoader from 'dataloader';
import { lastValueFrom } from 'rxjs';
import {
  GetUserRequest,
  GetUserResponse,
  ListUsersResponse,
  UsersGRPCService,
  UsersService,
} from './users.interface';

@Injectable()
export class UserServiceGRPC implements OnModuleInit, UsersService {
  private usersService: UsersGRPCService;
  private loader: DataLoader<string, GetUserResponse | null, string>;

  constructor(@Inject('USERS_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersGRPCService>('UsersService');
    this.loader = new DataLoader<string, GetUserResponse | null, string>(
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
    const response = await lastValueFrom(this.usersService.ListUsers({}));

    return response;
  }

  private async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
    const response = await lastValueFrom(this.usersService.GetUser({ id }));

    return response;
  }

  async getUserById({ id }: GetUserRequest): Promise<GetUserResponse> {
    return this.loader.load(id);
  }
}
