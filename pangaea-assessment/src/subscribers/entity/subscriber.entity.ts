import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Subscriber')
export class Subscriber {
  @ApiProperty({
    description: 'The Subscriber Id',
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description: 'The Subscriber Url',
  })
  @Column()
  url: string;
  @ApiProperty({
    description: 'The topic Subscriber joined',
  })
  @Column()
  topic: string;
}
