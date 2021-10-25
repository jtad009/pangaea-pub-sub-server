import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from '../entity/subscriber.entity';
import { SubscriberService } from './subscriber-service.service';

import { SubscriberController } from '../subscriber-controller/subscriber-controller.controller';

describe('SubscriberService', () => {
  let service: SubscriberService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          entities: [Subscriber],
          database: 'glo',
          type: 'mysql',
          host: '172.30.0.1',
          port: 6111,
          username: 'glo',
          password: 'QXlvbWlkZU8K',
          synchronize: false,
          migrations: ['dist/src/db/migrations/*.js'],
          cli: {
            migrationsDir: 'src/db/migrations',
          },
        }),
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
    }).compile();

    service = module.get<SubscriberService>(SubscriberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be able to create new subscriber', async () => {
    const allSubscribers = await service.create(
      'topic2',
      'http://localhost:9999/events',
    );
    expect(allSubscribers).toBeInstanceOf(Subscriber);
    expect(allSubscribers).toHaveProperty('url');
    expect(allSubscribers).toHaveProperty('topic');
  });
  it('should be able to get all Subscribers', async () => {
    const allSubscribers = await service.getAllSubscribers('topic2');
    expect(allSubscribers.length).toBeGreaterThan(0);
  });
  it('should be able to check if user already subscribed', async () => {
    const userExist = await service.userExist(
      'http://localhost:9999/events',
      'topic2',
    );
    expect(userExist).toBe(true);
  });
});
