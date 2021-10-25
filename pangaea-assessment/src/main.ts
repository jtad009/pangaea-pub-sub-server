import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PublishModule } from './publisher/publish/publish.module';
import SubscriberModule from './subscribers/subscriber/subscriber.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Publish-Subscriber Server') //the title you want for your swagger docs
    .setDescription(
      `Pangaea BE Coding Challenge
    For this challenge we'll be recreating a pub / sub system using HTTP requests. Feel free to use whatever langauges or frameworks you wish.`,
    ) //description
    .setVersion('1.0') //version setting for the docs
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [PublishModule, SubscriberModule], //the modules that you want to include in your swagger docs
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
