import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
  UsersServiceClient,
  UsersServiceController,
} from './generated/users';

@Injectable()
export class UsersGRPCClient implements OnModuleInit, UsersServiceController {
  private service: UsersServiceClient;

  constructor(
    @Inject(USERS_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  GetUser(request: GetUserRequest): Observable<GetUserResponse> {
    return this.service.GetUser(request);
  }

  CreateUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.service.CreateUser(request);
  }

  UpdateUser(request: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.service.UpdateUser(request);
  }

  DeleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse> {
    return this.service.DeleteUser(request);
  }

  ListUsers(request: ListUsersRequest): Observable<ListUsersResponse> {
    return this.service.ListUsers(request);
  }
}
