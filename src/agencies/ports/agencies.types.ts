import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AgencyModel } from '../core/agencies.domain';

@ObjectType()
export class AgencyType implements Partial<AgencyModel> {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  email: string;
}
