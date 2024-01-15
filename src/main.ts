import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO
  const config = new DocumentBuilder()
    .setTitle('Stone')
    .setDescription('Somethings')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();