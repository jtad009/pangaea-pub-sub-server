import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entity/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}
  /**
   * Get all Subscribers that belong to a topic
   * @param <string> topic
   * @returns  <Promise<Subscriber[]>>
   */
  async getAllSubscribers(topic: string): Promise<Subscriber[]> {
    try {
      const subscribers = this.subscriberRepository.find({
        where: {
          topic,
        },
      });
      return subscribers;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Createa new subscriber
   * @param topic
   * @param url
   * @returns  <Promise<Subscriber>>
   */
  async create(topic: string, url: string): Promise<Subscriber> {
    const newSub = this.subscriberRepository.create({ topic, url });
    return this.subscriberRepository.save(newSub);
  }
  /**
   * Check if user exist for this topic
   * @param url
   * @returns <Promise<boolean>>
   */
  async userExist(url: string, topic: string): Promise<boolean> {
    const count = await this.subscriberRepository.count({
      where: {
        topic,
        url,
      },
    });
    return count && count > 0;
  }
}
