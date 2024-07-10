import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import useragent from 'express-useragent';

import { EnvService } from '@config/env/env.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();

  app.use(useragent.express());
  app.use(compression());

  const configService = app.get(EnvService);
  const port = configService.get('APP_PORT');

  await app.listen(port);
}
bootstrap();
