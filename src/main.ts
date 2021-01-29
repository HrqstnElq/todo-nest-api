import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  //allow all origin, header, ...
  app.enableCors({});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('todo api')
    .setVersion('1.0')
    .setBasePath('/')
    .addBearerAuth()
    .build();

  const documents = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, documents);
  await app.listen(port);
}
bootstrap();
