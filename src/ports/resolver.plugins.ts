import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

import { GraphQLContext } from './resolver.context';

@Plugin()
export class LoggingResolverPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<GraphQLContext>> {
    return {
      async willSendResponse(ctx) {
        if (ctx.operationName === 'IntrospectionQuery') return;

        console.log(
          `Will send response - ${ctx.contextValue.req?.user?.name ?? 'Anonymous'}`,
        );
      },
    };
  }
}
