import { join } from 'path';
import { makeGrpcClientOptions } from 'src/grpc-client.options';

export const userGrpcClientOptions = makeGrpcClientOptions({
  port: '3002',
  packageName: 'users',
  protoPath: join(__dirname, './users.proto'),
});
