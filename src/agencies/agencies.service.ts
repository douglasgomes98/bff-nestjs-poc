import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as Dataloader from 'dataloader';
import { lastValueFrom } from 'rxjs';
import {
  AgenciesGRPCService,
  AgenciesService,
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesResponse,
} from './agencies.interface';

@Injectable()
export class AgenciesServiceGRPC implements OnModuleInit, AgenciesService {
  private agenciesService: AgenciesGRPCService;
  private loader: Dataloader<string, GetAgencyResponse | null, string>;

  constructor(
    @Inject('AGENCIES_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.agenciesService =
      this.client.getService<AgenciesGRPCService>('AgenciesService');
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
    const response = await lastValueFrom(this.agenciesService.ListAgencies({}));

    return response;
  }

  private async getAgency({
    id,
  }: GetAgencyRequest): Promise<GetAgencyResponse> {
    const response = await lastValueFrom(
      this.agenciesService.GetAgency({ id }),
    );

    return response;
  }

  async getAgencyById({ id }: GetAgencyRequest): Promise<GetAgencyResponse> {
    return this.loader.load(id);
  }
}
