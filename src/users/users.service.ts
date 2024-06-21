import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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

  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersGRPCService>('UsersService');
  }

  async listUsers(): Promise<ListUsersResponse> {
    const response = await lastValueFrom(this.usersService.ListUsers({}));

    return response;
  }

  async getUserById({ id }: GetUserRequest): Promise<GetUserResponse> {
    const response = await lastValueFrom(this.usersService.GetUser({ id }));

    return response;
  }
}
