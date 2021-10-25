import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('message-queue')
export class PubConsumer {
  private readonly logger = new Logger(PubConsumer.name);
  private httpService: HttpService = new HttpService();
  @Process('publish-to-subscribers')
  messageJob(job: Job) {
    const { url, message, topic } = job.data;
    this.logger.log(
      'Queue Subscriber',
      `Message picked and about to be dispatched to ${url}`,
    );
    if (url && url.length) {
      this.httpService
        .post(
          url.includes('localhost:9000')
            ? 'http://pangaea_subscriber_server_api:9000/'
            : url,
          { data: message, topic: topic },
        )
        .subscribe((res) =>
          this.logger.log('Data response from subscriber: ', res.data),
        );
    }
  }
}
