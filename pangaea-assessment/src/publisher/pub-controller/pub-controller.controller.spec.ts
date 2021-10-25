import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import SubscriberModule from '../../subscribers/subscriber/subscriber.module';
import { Subscriber } from '../../subscribers/entity/subscriber.entity';
import { PubConsumer } from '../pub-consumer';
import { PubProducerService } from '../pub-producer/pub-producer.service';
import { PubController } from './pub-controller.controller';
import { PublishDto } from '../dto/publish.dto';

describe('PubController', () => {
  let controller: PubController;

  beforeAll(async () => {
    jest.setTimeout(300000);
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
          keepConnectionAlive: true,
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
        SubscriberModule,
      ],
      controllers: [PubController],
      providers: [PubConsumer, PubProducerService],
    }).compile();

    controller = module.get<PubController>(PubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be able to publish', async () => {
    const publishDto = new PublishDto();
    publishDto.message = 'This is a test message';
    const topic = 'topic1';
    const data = await controller.sendMessage(topic, publishDto);
    expect(data).toEqual({
      status: 'OK',
      message: `"This is a test message" published successfully to "topic1"`,
    });
  });
});
