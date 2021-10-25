import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberDto } from '../dto/subscriber.dto';
import { Subscriber } from '../entity/subscriber.entity';
import { SubscriberService } from '../subscriber-service/subscriber-service.service';
import { SubscriberController } from './subscriber-controller.controller';

describe('SubscriberController', () => {
  let controller: SubscriberController;
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
      providers: [SubscriberService, Subscriber],
      controllers: [SubscriberController],
      exports: [SubscriberService],
    }).compile();

    controller = module.get<SubscriberController>(SubscriberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be able to subscribe to a topic', async () => {
    const subscribeDto = new SubscriberDto();

    subscribeDto.url = 'http://localhost:9000/events';
    const subscriber = await controller.subscribe('topic1', subscribeDto);
    expect(subscriber).toHaveProperty('topic');
    expect(subscriber).toHaveProperty('url');
  });
  it('should not be able to subscribe to a topic twice', async () => {
    const subscribeDto = new SubscriberDto();

    subscribeDto.url = 'http://localhost:9000/events';
    const subscriber = await controller.subscribe('topic1', subscribeDto);
    expect(subscriber).toEqual({
      status: 'error',
      message: 'Subscription already exist.',
    });
  });
});
