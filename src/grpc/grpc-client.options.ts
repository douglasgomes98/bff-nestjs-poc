import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { EnvModule } from '@config/env.module';
import { EnvService } from '@config/env.service';
import { Env } from '@config/env.validator';
import { ReflectionService } from '@grpc/reflection';

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type EnvUrl = KeysMatching<Env, string>;

type GrpcClientProps = {
  packageName: string;
  envUrl: EnvUrl;
  protoPath: string;
};

export const makeGrpcClient = ({
  packageName,
  envUrl,
  protoPath,
}: GrpcClientProps): ClientsProviderAsyncOptions => ({
  imports: [EnvModule],
  name: packageName,
  useFactory: (envService: EnvService) => {
    return {
      transport: Transport.GRPC,
      options: {
        url: envService.get(envUrl),
        package: packageName,
        protoPath,
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
        loader: {
          includeDirs: [join(__dirname, './')],
          keepCase: true,
          enums: String,
          oneofs: true,
          defaults: true,
        },
      },
    };
  },
  inject: [EnvService],
});
