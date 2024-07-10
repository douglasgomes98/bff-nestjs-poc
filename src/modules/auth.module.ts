import { Global, Module } from '@nestjs/common';

import { JwtService } from '@adapters/jwt-service';
import { AuthService } from '@core/auth.service';

@Global()
@Module({
  providers: [JwtService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
