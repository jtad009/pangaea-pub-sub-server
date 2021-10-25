import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  /**
   * Get a record from the store
   * @param key
   * @returns
   */
  async get(key): Promise<any> {
    return await this.cache.get(key);
  }
  /**
   * Add a record to the store
   * @param key
   * @param value
   */
  async set(key, value) {
    await this.cache.set(key, value, 1000);
  }
  /**
   * Delete a store record
   * @param key
   */
  async del(key) {
    await this.cache.del(key);
  }
}
