import { Module, CacheModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: configService.get('REDIS_URL')
          ? redisStore.create(configService.get('REDIS_URL'))
          : redisStore.create({
              host: configService.get('REDIS_HOST'),
              port: configService.get('REDIS_POST'),
            }),
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
