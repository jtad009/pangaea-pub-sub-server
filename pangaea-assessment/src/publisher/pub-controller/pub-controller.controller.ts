import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriberService } from '../../subscribers/subscriber-service/subscriber-service.service';
import { PublishDto } from '../dto/publish.dto';
import { PubProducerService } from '../pub-producer/pub-producer.service';

@ApiTags('publish')
@Controller('pub-controller')
export class PubController {
  constructor(
    private messageProducerService: PubProducerService,
    private subscriptionService: SubscriberService,
  ) {}
  @ApiOperation({
    summary: 'Publish message to subscribers',
    description:
      'This endpoint is responsible for publsihing messages to all topic subscribers',
  })
  @ApiParam({
    name: 'topic',
    description: 'The topic to publish to',
  })
  @ApiBody({
    type: PublishDto,
    description: 'Store Publish structure',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('publish/:topic')
  async sendMessage(
    @Param('topic') topic: string,
    @Body() publishDto: PublishDto,
  ): Promise<{ status: string; message: string }> {
    // when a topic is sent over the wire get all subsrcibers to that topic from the db
    const allSubscribers = await this.subscriptionService.getAllSubscribers(
      topic,
    );
    // publish to all subscribers
    allSubscribers.forEach((subscriber) =>
      this.messageProducerService.sendMessage(
        publishDto.message,
        topic,
        subscriber.url,
      ),
    );
    // dispatch the subscribers and message to the PubPublishService

    return {
      status: 'OK',
      message: `"${publishDto.message}" published successfully to "${topic}"`,
    };
  }
}
