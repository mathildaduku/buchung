import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module'; // Import your modules
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import express from 'express';
import xss from 'xss';
import mongoSanitize from 'mongo-sanitize';
import hpp from 'hpp';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE, {}),
    AuthModule,
    HotelsModule,
    UsersModule,
    RoomsModule,
    ReviewsModule,
    BookingsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet(),
        rateLimit({
          max: 20,
          windowMs: 60 * 60 * 1000,
          message:
            'Too many request from this IP, please try again in an hour!',
        }),
        express.json({ limit: '10kb' }),
        mongoSanitize(),
        xss(),
        hpp({
          whitelist: [
            'city',
            'starRating',
            'room_type',
            'availability',
            'sort',
            'fields',
          ],
        }),
      )
      .forRoutes({ path: '/api', method: RequestMethod.ALL });
  }
}
