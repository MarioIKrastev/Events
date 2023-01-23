import * as metadata from 'reflect-metadata';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AtGuard(reflector));
  app.use(cookieParser());
  app.enableCors();
  await app.listen(3030);
}
bootstrap();
