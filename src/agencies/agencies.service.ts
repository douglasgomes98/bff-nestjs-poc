import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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

  constructor(@Inject('AGENCIES_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.agenciesService =
      this.client.getService<AgenciesGRPCService>('AgenciesService');
  }

  async listAgencies(): Promise<ListAgenciesResponse> {
    const response = await lastValueFrom(this.agenciesService.ListAgencies({}));

    return response;
  }

  async getAgencyById({ id }: GetAgencyRequest): Promise<GetAgencyResponse> {
    const response = await lastValueFrom(
      this.agenciesService.GetAgency({ id }),
    );

    return response;
  }
}
