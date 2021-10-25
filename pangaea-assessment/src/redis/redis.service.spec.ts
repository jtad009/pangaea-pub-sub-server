import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

describe('RedisService', () => {
  let service: RedisService;
  let key: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();
    key = 'key-1';
    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should fetch from cache', async () => {
    await service.set(key, 'key');
    const cache = await service.get(key);
    expect(cache).toBe('key');
  });

  it('it should delete from cache', async () => {
    await service.del(key);
    const cache = await service.get(key);
    expect(cache).toBeNull();
  });
});
