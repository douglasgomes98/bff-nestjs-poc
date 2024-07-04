export const AGENCIES_DATA_SOURCE_NAME = 'AGENCIES_DATA_SOURCE';

export interface ListAgenciesResponse {
  agencies: AgencyModel[];
}

export interface GetAgencyRequest {
  id: string;
}

export interface GetAgencyResponse {
  agency: AgencyModel;
}

export interface AgencyModel {
  id: string;
  name: string;
  email: string;
}

export interface AgenciesDataSource {
  listAgencies(): Promise<ListAgenciesResponse>;
  getAgencyById(request: GetAgencyRequest): Promise<GetAgencyResponse>;
}
