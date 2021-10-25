import { ApiProperty } from '@nestjs/swagger';

export class PublishDto {
  @ApiProperty({
    description: 'The message to pulbish',
  })
  message: any;
}
