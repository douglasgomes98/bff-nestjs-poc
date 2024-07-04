import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  AGENCIES_PACKAGE_NAME,
  AGENCIES_SERVICE_NAME,
  AgenciesServiceClient,
  AgenciesServiceController,
  CreateAgencyRequest,
  CreateAgencyResponse,
  DeleteAgencyRequest,
  DeleteAgencyResponse,
  GetAgencyRequest,
  GetAgencyResponse,
  ListAgenciesRequest,
  ListAgenciesResponse,
  UpdateAgencyRequest,
  UpdateAgencyResponse,
} from './generated/agencies';

@Injectable()
export class AgenciesGRPCClient
  implements OnModuleInit, AgenciesServiceController
{
  private service: AgenciesServiceClient;

  constructor(
    @Inject(AGENCIES_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<AgenciesServiceClient>(
      AGENCIES_SERVICE_NAME,
    );
  }

  GetAgency(request: GetAgencyRequest): Observable<GetAgencyResponse> {
    return this.service.GetAgency(request);
  }

  CreateAgency(request: CreateAgencyRequest): Observable<CreateAgencyResponse> {
    return this.service.CreateAgency(request);
  }

  UpdateAgency(request: UpdateAgencyRequest): Observable<UpdateAgencyResponse> {
    return this.service.UpdateAgency(request);
  }

  DeleteAgency(request: DeleteAgencyRequest): Observable<DeleteAgencyResponse> {
    return this.service.DeleteAgency(request);
  }

  ListAgencies(request: ListAgenciesRequest): Observable<ListAgenciesResponse> {
    return this.service.ListAgencies(request);
  }
}
