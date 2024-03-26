import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Validation
import { ValidationPipe } from '@nestjs/common';
var bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

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
