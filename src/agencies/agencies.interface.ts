import { Observable } from 'rxjs';

export interface AgenciesGRPCService {
  ListAgencies(request: ListAgenciesRequest): Observable<ListAgenciesResponse>;
  GetAgency(request: GetAgencyRequest): Observable<GetAgencyResponse>;
}

export interface AgenciesService {
  listAgencies(): Promise<ListAgenciesResponse>;
  getAgencyById(request: GetAgencyRequest): Promise<GetAgencyResponse>;
}

export interface Agency {
  id: string;
  name: string;
  email: string;
}

export interface ListAgenciesRequest {}

export interface ListAgenciesResponse {
  agencies: Agency[];
}

export interface GetAgencyRequest {
  id: string;
}

export interface GetAgencyResponse {
  agency: Agency;
}
