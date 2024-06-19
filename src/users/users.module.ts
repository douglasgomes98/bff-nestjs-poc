import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { UsersResolver } from './users.resolver';
import { UserServiceGRPC } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [
    UsersResolver,
    {
      provide: 'UsersService',
      useClass: UserServiceGRPC,
    },
  ],
})
export class UsersModule {}
