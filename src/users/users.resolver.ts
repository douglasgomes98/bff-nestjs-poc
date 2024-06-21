import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AgenciesService } from 'src/agencies/agencies.interface';
import { UsersService } from './users.interface';
import { UserType } from './users.types';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
    @Inject('AgenciesService')
    private readonly agenciesService: AgenciesService,
  ) {}

  @Query(() => [UserType])
  async listUsers() {
    const { users } = await this.usersService.listUsers();

    return users;
  }

  @Query(() => UserType)
  async getUserById(@Args('id') id: string) {
    const { user } = await this.usersService.getUserById({ id });

    return user;
  }

  @ResolveField()
  async agency(@Parent() user: UserType) {
    const { agency } = await this.agenciesService.getAgencyById({
      id: user.agency_id,
    });

    return agency;
  }
}
