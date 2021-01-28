import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('todo api')
    .setVersion('1.0')
    .build();

  const documents = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, documents);
  await app.listen(port);
}
bootstrap();
