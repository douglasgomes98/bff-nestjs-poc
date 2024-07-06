import { Module } from '@nestjs/common';

import { UsersDataSourceGRPC } from '@adapters/users-grpc.data-source';
import { UsersService } from '@core/users.service';
import { GrpcModule } from '@grpc/grpc.module';
import { UsersResolver } from '@ports/users.resolver';

import { AgenciesModule } from './agencies.module';

@Module({
  imports: [GrpcModule, AgenciesModule],
  providers: [UsersResolver, UsersService, UsersDataSourceGRPC],
  exports: [UsersService],
})
export class UsersModule {}
