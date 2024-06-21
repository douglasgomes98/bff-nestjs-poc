import { join } from 'path';
import { makeGrpcClientOptions } from 'src/grpc-client.options';

export const agenciesGrpcClientOptions = makeGrpcClientOptions({
  port: '3003',
  packageName: 'agencies',
  protoPath: join(__dirname, './agencies.proto'),
});
