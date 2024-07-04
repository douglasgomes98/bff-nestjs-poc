import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { AgenciesGRPCClient } from './agencies.grpc-client';
import { agenciesGrpcClientOptions } from './agencies.grpc-client.options';
import { AGENCIES_PACKAGE_NAME } from './generated/agencies';
import { USERS_PACKAGE_NAME } from './generated/users';
import { UsersGRPCClient } from './users.grpc-client';
import { usersGrpcClientOptions } from './users.grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AGENCIES_PACKAGE_NAME,
        ...agenciesGrpcClientOptions,
      },
    ]),
    ClientsModule.register([
      {
        name: USERS_PACKAGE_NAME,
        ...usersGrpcClientOptions,
      },
    ]),
  ],
  providers: [AgenciesGRPCClient, UsersGRPCClient],
  exports: [AgenciesGRPCClient, UsersGRPCClient],
})
export class GrpcModule {}
