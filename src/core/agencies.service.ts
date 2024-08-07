import { Injectable } from '@nestjs/common';

import { AgenciesDataSourceGRPC } from '@adapters/agencies-grpc.data-source';
import {
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from '@grpc/generated/agencies';

@Injectable()
export class AgenciesService {
  constructor(private readonly dataSource: AgenciesDataSourceGRPC) {}

  async listAgencies(): Promise<ListAgenciesResponse> {
    return this.dataSource.listAgencies();
  }

  async getAgencyById({ id }: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.dataSource.getAgency({ id });
  }
}
