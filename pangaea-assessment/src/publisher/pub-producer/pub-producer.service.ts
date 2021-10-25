import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
export class PubProducerService {
  private readonly logger = new Logger(PubProducerService.name);
  constructor(@InjectQueue('message-queue') private queue: Queue) {}
  async sendMessage(
    msg: string,
    topic: string,
    subscriberUrl: string,
  ): Promise<Job> {
    this.logger.log(
      'Queue Called',
      `Message: '${msg}' sent to topic '${topic}'`,
    );
    return await this.queue.add('publish-to-subscribers', {
      message: msg,
      topic,
      url: subscriberUrl,
    });
  }
}
