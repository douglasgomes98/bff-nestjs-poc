import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

type Props = {
  port: string;
  packageName: string;
  protoPath: string;
};

export const makeGrpcClientOptions = ({
  port,
  packageName,
  protoPath,
}: Props): ClientOptions => ({
  transport: Transport.GRPC,
  options: {
    url: `localhost:${port}`,
    package: packageName,
    protoPath,
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
    loader: {
      includeDirs: [join(__dirname, './')],
      keepCase: true,
    },
  },
});
