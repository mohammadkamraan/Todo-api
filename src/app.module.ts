import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConnectionService } from '../database/databaseConnection.service';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './authentication/auth.middleware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnectionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
