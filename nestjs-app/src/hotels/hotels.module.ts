// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HotelSchema } from './schemas/hotel.schema';
import { AuthModule } from '../auth/auth.module';
import { RoomModule } from '../rooms/room.module';
import { ReviewModule } from '../reviews/review.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
    AuthModule,
    RoomModule,
    ReviewModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
