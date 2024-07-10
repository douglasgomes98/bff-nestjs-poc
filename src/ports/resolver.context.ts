import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export type GraphQLContext = GraphQLExecutionContext & {
  req: Request;
  res: Response;
};

export async function contextResolver(
  context: GraphQLContext,
): Promise<GraphQLContext> {
  return {
    ...context,
    req: context.req,
    res: context.res,
  } as GraphQLContext;
}
