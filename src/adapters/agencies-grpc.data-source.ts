import { Injectable } from '@nestjs/common';
import Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';

import { ContextService } from '@core/context.service';
import { AgenciesGRPCClient } from '@grpc/agencies.grpc-client';
import {
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from '@grpc/generated/agencies';

import { DataSourceGRPC } from './grpc.data-source';

@Injectable()
export class AgenciesDataSourceGRPC extends DataSourceGRPC {
  private loader: Dataloader<string, GetAgencyResponse | null, string>;

  constructor(
    private readonly client: AgenciesGRPCClient,
    contextService: ContextService,
  ) {
    super(contextService);
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
    return lastValueFrom(
      this.client.getMethods().GetAgency(request, this.createMetadata()),
    );
  }

  listAgencies(): Promise<ListAgenciesResponse> {
    return lastValueFrom(
      this.client.getMethods().ListAgencies({}, this.createMetadata()),
    );
  }

  getAgency(request: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.loader.load(request.id);
  }
}
