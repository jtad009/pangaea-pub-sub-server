import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  entities: ['dist/src/**/*.entity.js'],
  database: 'glo',
  type: 'mysql',
  host: '172.30.0.1',
  port: 6111,
  username: 'glo',
  password:'QXlvbWlkZU8K',
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
