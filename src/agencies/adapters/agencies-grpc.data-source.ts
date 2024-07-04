import { Injectable } from '@nestjs/common';
import * as Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import { AgenciesGRPCClient } from 'src/grpc/agencies.grpc-client';

import {
  AgenciesDataSource,
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from '../core/agencies.domain';
import { convertAgencyToAgencyModel } from '../ports/agencies.converts';

@Injectable()
export class AgenciesDataSourceGRPC implements AgenciesDataSource {
  private loader: Dataloader<string, GetAgencyResponse | null, string>;

  constructor(private readonly client: AgenciesGRPCClient) {
    this.loader = new Dataloader<string, GetAgencyResponse | null, string>(
      async (keys) => {
        const items = await Promise.all(
          keys.map((key) => this.getAgency({ id: key })),
        );

        return keys.map(
          (key) => items.find((item) => item?.agency?.id === key) || null,
        );
      },
    );
  }

  async listAgencies(): Promise<ListAgenciesResponse> {
    const response = await lastValueFrom(this.client.ListAgencies({}));

    return {
      agencies: response.agencies.map(convertAgencyToAgencyModel),
    };
  }

  getAgencyById(request: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.loader.load(request.id);
  }

  private async getAgency(
    request: GetAgencyRequest,
  ): Promise<GetAgencyResponse> {
    const response = await lastValueFrom(this.client.GetAgency(request));

    return {
      agency: convertAgencyToAgencyModel(response.agency),
    };
  }
}
