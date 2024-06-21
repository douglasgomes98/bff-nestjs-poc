import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AgenciesModule } from 'src/agencies/agencies.module';
import { userGrpcClientOptions } from './user.grpc-client.options';
import { UsersResolver } from './users.resolver';
import { UserServiceGRPC } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        ...userGrpcClientOptions,
      },
    ]),
    AgenciesModule,
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
