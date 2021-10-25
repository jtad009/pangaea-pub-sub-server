import { ApiProperty } from '@nestjs/swagger';

export class SubscriberDto {
  @ApiProperty({
    description: 'The subscriber url',
  })
  url: string;
}
