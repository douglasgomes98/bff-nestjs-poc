import { NestFactory } from '@nestjs/core';

import { EnvService } from '@config/env/env.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);
  const port = configService.get('APP_PORT');

  await app.listen(port);
}
bootstrap();
