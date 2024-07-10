import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AgenciesService } from '@core/agencies.service';
import { LoggedUser } from '@core/auth.service';
import { UsersService } from '@core/users.service';

import { AuthResolverGuard } from './resolver.auth-guard';
import { User } from './resolver.decorators';
import { UserType } from './users.types';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly agenciesService: AgenciesService,
  ) {}

  @AuthResolverGuard()
  @Query(() => UserType)
  async me(@User() loggedUser: LoggedUser) {
    const { user } = await this.usersService.getUserById({
      id: String(loggedUser.id),
    });

    return user;
  }

  @AuthResolverGuard()
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
