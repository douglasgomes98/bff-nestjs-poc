import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { LoggedUser } from '@core/auth.service';

type GraphQLRequestContext = GraphQLExecutionContext & {
  req: Request;
  res: Response;
};

export type GraphQLContext = GraphQLExecutionContext & {
  req: Request & { user?: LoggedUser };
  res: Response;
};

export async function contextResolver(
  context: GraphQLRequestContext,
): Promise<GraphQLContext> {
  return {
    ...context,
    req: context.req,
    res: context.res,
  } as GraphQLContext;
}
