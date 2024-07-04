import { Module } from '@nestjs/common';

import { AgenciesModule } from 'src/agencies/agencies.module';
import { GrpcModule } from 'src/grpc/grpc.module';

import { UsersDataSourceGRPC } from './adapters/users-grpc.data-source';
import { USERS_DATA_SOURCE_NAME } from './core/users.domain';
import { UsersService } from './core/users.service';
import { UsersResolver } from './ports/users.resolver';

@Module({
  imports: [GrpcModule, AgenciesModule],
  providers: [
    UsersResolver,
    UsersService,
    {
      provide: USERS_DATA_SOURCE_NAME,
      useClass: UsersDataSourceGRPC,
    },
  ],
})
export class UsersModule {}
