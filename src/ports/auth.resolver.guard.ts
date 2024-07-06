import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

import { JwtService } from '@adapters/jwt-service';

@Injectable()
class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.validateToken(token);
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
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
    const userPermissions: string[] = ctx.getContext().req.user.permissions;

    if (requiredPermissions.length === 0) return true;

    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}

export function AuthGuard(
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
