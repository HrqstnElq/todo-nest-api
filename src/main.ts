import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //allow all origin, header, ...
  app.enableCors({});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //set static folder
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //set view engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('todo api')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const documents = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documents);
  await app.listen(port);
}
bootstrap();
