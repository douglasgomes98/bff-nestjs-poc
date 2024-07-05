import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { RoleType } from '@grpc/generated/roles';
import { User } from '@grpc/generated/users';

import { AgencyType } from './agencies.types';

@ObjectType()
export class UserType implements Partial<User> {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  email: string;
  @Field()
  agency_id: string;

  @Field(() => RoleType)
  role: RoleType;

  @Field(() => AgencyType)
  agency: AgencyType;
}

registerEnumType(RoleType, {
  name: 'RoleType',
});
