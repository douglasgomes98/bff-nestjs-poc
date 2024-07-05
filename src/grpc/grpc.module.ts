import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';

import { EnvModule } from '@config/env.module';

import { AgenciesGRPCClient } from './agencies.grpc-client';
import { AGENCIES_PACKAGE_NAME } from './generated/agencies';
import { USERS_PACKAGE_NAME } from './generated/users';
import { makeGrpcClient } from './grpc-client.options';
import { UsersGRPCClient } from './users.grpc-client';

@Module({
  imports: [
    EnvModule,
    ClientsModule.registerAsync([
      makeGrpcClient({
        packageName: USERS_PACKAGE_NAME,
        envUrl: 'SVC_USER',
        protoPath: join(__dirname, './proto/users.proto'),
      }),
      makeGrpcClient({
        packageName: AGENCIES_PACKAGE_NAME,
        envUrl: 'SVC_AGENCY',
        protoPath: join(__dirname, './proto/agencies.proto'),
      }),
    ]),
  ],
  providers: [AgenciesGRPCClient, UsersGRPCClient],
  exports: [AgenciesGRPCClient, UsersGRPCClient],
})
export class GrpcModule {}
