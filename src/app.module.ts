import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConnectionService } from '../database/databaseConnection.service';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
      imports: [ConfigModule],
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService, DatabaseConnectionService],
})
export class AppModule {
}
