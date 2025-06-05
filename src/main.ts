import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo manager')
    .setDescription('Simple todo list implemented using nestjs')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('api', app, () => SwaggerModule.createDocument(app, swaggerConfig));
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
