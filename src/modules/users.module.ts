import { Module } from '@nestjs/common';

import { UsersDataSourceGRPC } from 'src/adapters/users-grpc.data-source';
import { UsersService } from 'src/core/users.service';
import { GrpcModule } from 'src/grpc/grpc.module';
import { UsersResolver } from 'src/ports/users.resolver';

import { AgenciesModule } from './agencies.module';

@Module({
  imports: [GrpcModule, AgenciesModule],
  providers: [UsersResolver, UsersService, UsersDataSourceGRPC],
})
export class UsersModule {}
