import { RoleType } from 'src/grpc/generated/roles';

export const USERS_DATA_SOURCE_NAME = 'USERS_DATA_SOURCE';

export interface ListUsersResponse {
  users: UserModel[];
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  user: UserModel;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  agency_id: string;
  role: RoleType;
}

export interface UsersDataSource {
  listUsers(): Promise<ListUsersResponse>;
  getUserById(request: GetUserRequest): Promise<GetUserResponse>;
}
