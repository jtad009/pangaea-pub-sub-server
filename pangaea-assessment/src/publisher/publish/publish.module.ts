import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import SubscriberModule from '../../subscribers/subscriber/subscriber.module';
import { PubConsumer } from '../pub-consumer';
import { PubController } from '../pub-controller/pub-controller.controller';
import { PubProducerService } from '../pub-producer/pub-producer.service';

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    SubscriberModule,
  ],
  controllers: [PubController],
  providers: [PubConsumer, PubProducerService],
  exports: [PubConsumer, PubProducerService],
})
export class PublishModule {}
