import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriberDto } from '../dto/subscriber.dto';
import { Subscriber } from '../entity/subscriber.entity';
import { SubscriberService } from '../subscriber-service/subscriber-service.service';
@ApiTags('subscriber')
@Controller('subscriber-controller')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}
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
    type: SubscriberDto,
    description: 'Store Publish structure',
  })
  @ApiCreatedResponse({
    status: 201,
    type: Subscriber,
    description: 'New Subscriber added to topic',
  })
  @ApiOkResponse({
    status: 200,
    type: Subscriber,
    description: 'New Subscriber added to topic',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('subscribe/:topic')
  async subscribe(
    @Param('topic') topic: string,
    @Body() subscribeDto: SubscriberDto,
  ): Promise<Subscriber | { status: string; message: string }> {
    const alreadySubscribed = await this.subscriberService.userExist(
      subscribeDto.url,
      topic?.toLowerCase(),
    );
    if (alreadySubscribed) {
      return { status: 'error', message: 'Subscription already exist.' };
    }
    return await this.subscriberService.create(
      topic?.toLowerCase(),
      subscribeDto.url,
    );
  }
}
