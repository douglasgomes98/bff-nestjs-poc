import { Injectable } from '@nestjs/common';
import type { Algorithm } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import { EnvService } from '@config/env/env.service';

interface PublicKey {
  pem: string;
  kty: string;
  use: string;
  n: string;
  e: string;
  kid: string;
  x5t: string;
  x5c: string[];
  alg: Algorithm;
}

interface UserJwtPayload {
  email: string;
  name: string;
  family_name: string;
  given_name: string;
  phone_number: string;
  agency_id: number;
  user_id: number;
  language: string;
  timezone: string;
  consolidator_currency: string;
  permissions: [];
}

@Injectable()
export class JwtService {
  constructor(private readonly envService: EnvService) {}

  async validateToken(token: string): Promise<UserJwtPayload> {
    const { pem, alg } = await this.getPublicKey();
    const jwtPayload = jwt.verify(token, pem, { algorithms: [alg] });

    return {
      email: jwtPayload['user_metadata.email'],
      name: jwtPayload['user_metadata.name'],
      family_name: jwtPayload['user_metadata.family_name'],
      given_name: jwtPayload['user_metadata.given_name'],
      phone_number: jwtPayload['user_metadata.phone_number'],
      agency_id: jwtPayload['user_metadata.agency_id'],
      user_id: jwtPayload['user_metadata.user_id'],
      language: jwtPayload['user_metadata.language'],
      timezone: jwtPayload['user_metadata.timezone'],
      consolidator_currency: jwtPayload['user_metadata.consolidator_currency'],
      permissions: jwtPayload['permissions'],
    };
  }

  private async getPublicKey(): Promise<PublicKey> {
    try {
      const response = await fetch(this.envService.get('IDP_JWKS_URL'));
      const jwks = await response.json();

      const pem = jwkToPem(jwks.keys[0]);

      return {
        pem,
        ...jwks.keys[0],
      };
    } catch {
      throw new Error('Failed to fetch public key');
    }
  }
}
