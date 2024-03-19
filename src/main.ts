import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Validation
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // TODO
  const config = new DocumentBuilder()
    .setTitle('Crystal')
    .setDescription('Somethings')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(process.env.PORT);
}
bootstrap();
