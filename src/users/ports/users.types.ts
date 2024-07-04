import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { AgencyType } from 'src/agencies/ports/agencies.types';
import { RoleType } from 'src/grpc/generated/roles';

import { UserModel } from '../core/users.domain';

@ObjectType()
export class UserType implements Partial<UserModel> {
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
