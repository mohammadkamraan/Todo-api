import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import * as process from 'node:process';

config(); // load .env

const envProcess = process;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: envProcess.env.DB_HOST,
  port: Number(envProcess.env.DB_PORT),
  username: envProcess.env.DB_USERNAME,
  password: envProcess.env.DB_PASSWORD,
  database: envProcess.env.DB_NAME,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  synchronize: false,
  migrations: [join(__dirname, './migrations/**/*.{ts,js}')]
});