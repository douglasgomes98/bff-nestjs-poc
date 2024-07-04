import { join } from 'path';

import { makeGrpcClientOptions } from 'src/grpc/grpc-client.options';

import { AGENCIES_PACKAGE_NAME } from './generated/agencies';

export const agenciesGrpcClientOptions = makeGrpcClientOptions({
  port: '3003',
  packageName: AGENCIES_PACKAGE_NAME,
  protoPath: join(__dirname, './api/agencies.proto'),
});
