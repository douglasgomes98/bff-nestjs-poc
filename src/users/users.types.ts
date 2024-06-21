import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AgencyType } from 'src/agencies/agencies.types';
import { RoleType, User } from './users.interface';

@ObjectType()
export class UserType implements Partial<User> {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
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
