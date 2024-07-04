import { Module } from '@nestjs/common';

import { GrpcModule } from 'src/grpc/grpc.module';

import { AgenciesDataSourceGRPC } from './adapters/agencies-grpc.data-source';
import { AGENCIES_DATA_SOURCE_NAME } from './core/agencies.domain';
import { AgenciesService } from './core/agencies.service';
import { AgenciesResolver } from './ports/agencies.resolver';

@Module({
  imports: [GrpcModule],
  providers: [
    AgenciesResolver,
    AgenciesService,
    {
      provide: AGENCIES_DATA_SOURCE_NAME,
      useClass: AgenciesDataSourceGRPC,
    },
  ],
  exports: [AgenciesService],
})
export class AgenciesModule {}
