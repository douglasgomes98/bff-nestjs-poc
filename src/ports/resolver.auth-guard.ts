import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GraphQLContext } from './resolver.context';

@Injectable()
class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<GraphQLContext>().req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

@Injectable()
class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);

    const userPermissions: string[] =
      ctx.getContext<GraphQLContext>().req.user.permissions;

    if (requiredPermissions.length === 0) return true;

    const isAllowed = requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        `User does not have sufficient permissions to access.`,
      );
    }

    return true;
  }
}

export function AuthResolverGuard(
  permissions: string | string[] = [],
): MethodDecorator {
  return applyDecorators(
    SetMetadata(
      'permissions',
      typeof permissions === 'string' ? [permissions] : permissions,
    ),
    UseGuards(JwtGuard, PermissionsGuard),
  );
}
