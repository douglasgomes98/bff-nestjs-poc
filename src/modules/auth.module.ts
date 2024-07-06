import { Global, Module } from '@nestjs/common';

import { JwtService } from '@adapters/jwt-service';

@Global()
@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class AuthModule {}
