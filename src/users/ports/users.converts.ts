import { User } from 'src/grpc/generated/users';

import { UserModel } from '../core/users.domain';

export function convertUserToUserModel(user: User): UserModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    agency_id: user.agency_id,
    role: user.role,
  };
}
