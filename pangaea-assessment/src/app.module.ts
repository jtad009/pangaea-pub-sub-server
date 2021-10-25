import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { Subscriber } from './subscribers/entity/subscriber.entity';
import { PublishModule } from './publisher/publish/publish.module';
import SubscriberModule from './subscribers/subscriber/subscriber.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Subscriber]),
    RedisModule,
    PublishModule,
    SubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
