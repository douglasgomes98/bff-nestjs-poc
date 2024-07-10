import { Global, Module } from '@nestjs/common';

import { ContextService } from '@core/context.service';

@Global()
@Module({
  providers: [ContextService],
  exports: [ContextService],
})
export class CommonModule {}
