import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Agency } from './agencies.interface';

@ObjectType()
export class AgencyType implements Partial<Agency> {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
}
