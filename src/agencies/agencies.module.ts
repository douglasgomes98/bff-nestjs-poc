import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { agenciesGrpcClientOptions } from './agencies.grpc-client.options';
import { AgenciesResolver } from './agencies.resolver';
import { AgenciesServiceGRPC } from './agencies.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AGENCIES_PACKAGE',
        ...agenciesGrpcClientOptions,
      },
    ]),
  ],
  providers: [
    AgenciesResolver,
    {
      provide: 'AgenciesService',
      useClass: AgenciesServiceGRPC,
    },
  ],
  exports: ['AgenciesService'],
})
export class AgenciesModule {}
