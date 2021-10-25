import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post('/')
  index(@Body('topic') topic: string, @Body('data') data:string) {
    this.logger.log('Pulisher sent this topic: ', 
      topic
    )
    this.logger.log('Publisher sent this message',   data);
    return {
      topic,
      data
    };
  }
  @Post('/events')
  events(@Body('topic') topic: string, @Body('data') data:string) {
    return {
      topic,
      data
    };
  }
}
