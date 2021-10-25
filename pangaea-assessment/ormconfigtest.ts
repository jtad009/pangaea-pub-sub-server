import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {registerAs} from "@nestjs/config";
import { join } from 'path'

const config: SqliteConnectionOptions = {
  database: 'db_test',
  type: 'sqlite',
  entities: ['dist/src/subscribers/entity/subscriber.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;

