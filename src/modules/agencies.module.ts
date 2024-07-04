import { Module } from '@nestjs/common';

import { AgenciesDataSourceGRPC } from 'src/adapters/agencies-grpc.data-source';
import { AgenciesService } from 'src/core/agencies.service';
import { GrpcModule } from 'src/grpc/grpc.module';
import { AgenciesResolver } from 'src/ports/agencies.resolver';

@Module({
  imports: [GrpcModule],
  providers: [AgenciesResolver, AgenciesService, AgenciesDataSourceGRPC],
  exports: [AgenciesService],
})
export class AgenciesModule {}
