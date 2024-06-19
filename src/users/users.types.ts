import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './users.interface';

@ObjectType()
export class UserType implements Partial<User> {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
}
