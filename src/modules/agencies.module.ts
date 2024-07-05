import { Module } from '@nestjs/common';

import { AgenciesDataSourceGRPC } from '@adapters/agencies-grpc.data-source';
import { AgenciesService } from '@core/agencies.service';
import { GrpcModule } from '@grpc/grpc.module';
import { AgenciesResolver } from '@ports/agencies.resolver';

@Module({
  imports: [GrpcModule],
  providers: [AgenciesResolver, AgenciesService, AgenciesDataSourceGRPC],
  exports: [AgenciesService],
})
export class AgenciesModule {}
