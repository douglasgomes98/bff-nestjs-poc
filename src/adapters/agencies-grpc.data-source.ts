import { Injectable, Scope } from '@nestjs/common';
import * as Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import { AgenciesGRPCClient } from '@grpc/agencies.grpc-client';
import {
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from '@grpc/generated/agencies';

@Injectable({ scope: Scope.REQUEST })
export class AgenciesDataSourceGRPC {
  private loader: Dataloader<string, GetAgencyResponse | null, string>;

  constructor(private readonly client: AgenciesGRPCClient) {
    this.loader = new Dataloader<string, GetAgencyResponse | null, string>(
      async (keys) => {
        const items = await Promise.all(
          keys.map((key) => this.getAgencyById({ id: key })),
        );

        return keys.map(
          (key) => items.find((item) => item?.agency?.id === key) || null,
        );
      },
    );
  }

  private getAgencyById(request: GetAgencyRequest): Promise<GetAgencyResponse> {
    return lastValueFrom(this.client.getMethods().GetAgency(request));
  }

  listAgencies(): Promise<ListAgenciesResponse> {
    return lastValueFrom(this.client.getMethods().ListAgencies({}));
  }

  getAgency(request: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.loader.load(request.id);
  }
}
