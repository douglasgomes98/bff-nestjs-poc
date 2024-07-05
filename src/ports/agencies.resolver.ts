import { Args, Query, Resolver } from '@nestjs/graphql';

import { AgenciesService } from '@core/agencies.service';

import { AgencyType } from './agencies.types';

@Resolver(() => AgencyType)
export class AgenciesResolver {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Query(() => [AgencyType])
  async listAgencies() {
    const { agencies } = await this.agenciesService.listAgencies();

    return agencies;
  }

  @Query(() => AgencyType)
  async getAgencyById(@Args('id') id: string) {
    const { agency } = await this.agenciesService.getAgencyById({ id });

    return agency;
  }
}
