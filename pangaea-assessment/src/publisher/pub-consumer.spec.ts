import { PubConsumer } from './pub-consumer';

describe('PubConsumer', () => {
  let pubConsumer: PubConsumer;
  beforeAll(async () => {
    pubConsumer = new PubConsumer();
  });
  it('should be defined', () => {
    expect(pubConsumer).toBeDefined();
  });
});
