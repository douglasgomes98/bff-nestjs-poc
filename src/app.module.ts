import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { EnvModule } from '@config/env/env.module';
import { envValidator } from '@config/env/env.validator';
import { AuthMiddleware } from '@core/auth.middleware';
import { AuthModule } from '@modules/auth.module';
import { ResolverPluginsModule } from '@modules/resolver-plugins.module';
import { contextResolver } from '@ports/resolver.context';

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
    AuthModule,
    AgenciesModule,
    UsersModule,
    ResolverPluginsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [ResolverPluginsModule, AgenciesModule, UsersModule],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: contextResolver,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
