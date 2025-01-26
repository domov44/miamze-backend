import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DATABASE_URL);
// console.log(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV?.trim() === 'dev';
const isProd = process.env.NODE_ENV?.trim() === 'prod';
const isLocal = process.env.NODE_ENV?.trim() === 'local';

// console.log(isDev);
// console.log(isProd);

const localConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'root',
  password: 'root',
  database: 'miamze',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // synchronize: true, // Enabled for live database updates
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const prodConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.PROD_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const devConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DEV_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const dataSourceOptions: DataSourceOptions = isProd 
  ? prodConfig 
  : isDev 
    ? devConfig 
    : isLocal 
      ? localConfig 
      : localConfig;


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export { dataSourceOptions };
