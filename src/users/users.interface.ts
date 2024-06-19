import { Observable } from 'rxjs';

export interface UsersGRPCService {
  ListUsers(request: CreateUserRequest): Observable<ListUsersResponse>;
}

export interface UsersService {
  listUsers(): Promise<ListUsersResponse>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {}

export interface ListUsersResponse {
  users: User[];
}
