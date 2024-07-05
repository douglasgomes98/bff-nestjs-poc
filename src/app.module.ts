import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { EnvModule } from '@config/env.module';
import { envValidator } from '@config/env.validator';

import { GrpcModule } from './grpc/grpc.module';
import { AgenciesModule } from './modules/agencies.module';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envValidator.parse(env),
    }),
    EnvModule,
    GrpcModule,
    AgenciesModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [AgenciesModule, UsersModule],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class AppModule {}
