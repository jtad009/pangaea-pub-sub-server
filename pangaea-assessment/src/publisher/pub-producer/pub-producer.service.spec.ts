import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from '../../subscribers/entity/subscriber.entity';
import SubscriberModule from '../../subscribers/subscriber/subscriber.module';
import { PubProducerService } from './pub-producer.service';

describe('PubProducerService', () => {
  let service: PubProducerService;

  beforeAll(async () => {
    jest.setTimeout(10000);
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
      providers: [PubProducerService],
    }).compile();

    service = module.get<PubProducerService>(PubProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be able to sendMessage to queue', async () => {
    const addJobToQueue = await service.sendMessage(
      'this is a test message',
      'topic1',
      'http://localhost:9000/event',
    );
    expect(addJobToQueue.toJSON()).toHaveProperty('id');
  });
});
