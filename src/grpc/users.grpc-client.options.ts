import { join } from 'path';

import { makeGrpcClientOptions } from 'src/grpc/grpc-client.options';

import { USERS_PACKAGE_NAME } from './generated/users';

export const usersGrpcClientOptions = makeGrpcClientOptions({
  port: '3002',
  packageName: USERS_PACKAGE_NAME,
  protoPath: join(__dirname, './proto/users.proto'),
});
