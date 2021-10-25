import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from '../entity/subscriber.entity';
import { SubscriberController } from '../subscriber-controller/subscriber-controller.controller';
import { SubscriberService } from '../subscriber-service/subscriber-service.service';
import config from '../../../ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Subscriber]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [SubscriberController],
  providers: [SubscriberService, Subscriber],
  exports: [SubscriberService],
})
export default class SubscriberModule {}
