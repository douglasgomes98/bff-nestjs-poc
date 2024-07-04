import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Agency } from 'src/grpc/generated/agencies';

@ObjectType()
export class AgencyType implements Partial<Agency> {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  email: string;
}
