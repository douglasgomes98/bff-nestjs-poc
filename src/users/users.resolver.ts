import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.interface';
import { UserType } from './users.types';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  @Query(() => [UserType])
  async listUsers() {
    const { users } = await this.usersService.listUsers();

    return users;
  }
}
