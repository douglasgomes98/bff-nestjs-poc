import { Inject, Injectable } from '@nestjs/common';

import {
  AGENCIES_DATA_SOURCE_NAME,
  AgenciesDataSource,
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from './agencies.domain';

@Injectable()
export class AgenciesService {
  constructor(
    @Inject(AGENCIES_DATA_SOURCE_NAME)
    private readonly dataSource: AgenciesDataSource,
  ) {}

  async listAgencies(): Promise<ListAgenciesResponse> {
    return this.dataSource.listAgencies();
  }

  async getAgencyById({ id }: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.dataSource.getAgencyById({ id });
  }
}
