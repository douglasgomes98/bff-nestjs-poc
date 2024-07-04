import { Agency } from 'src/grpc/generated/agencies';

import { AgencyModel } from '../core/agencies.domain';

export function convertAgencyToAgencyModel(agency: Agency): AgencyModel {
  return {
    id: agency.id,
    name: agency.name,
    email: agency.email,
  };
}
