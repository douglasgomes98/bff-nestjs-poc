import { Injectable } from '@nestjs/common';

import { JwtService } from '@adapters/jwt-service';

export interface LoggedUser {
  id: number;
  agency_id: number;
  name: string;
  family_name: string;
  given_name: string;
  permissions: string[];
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<LoggedUser> {
    const jwtPayload = await this.jwtService.validateToken(token);

    return {
      id: jwtPayload.user_id,
      agency_id: jwtPayload.agency_id,
      name: jwtPayload.name,
      family_name: jwtPayload.family_name,
      given_name: jwtPayload.given_name,
      permissions: jwtPayload.permissions,
    };
  }
}
