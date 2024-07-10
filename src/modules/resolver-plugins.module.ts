import { Module } from '@nestjs/common';

import { LoggingResolverPlugin } from '@ports/resolver.plugins';

@Module({
  providers: [LoggingResolverPlugin],
})
export class ResolverPluginsModule {}
