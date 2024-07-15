// src/bookings/bookings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectModel('Booking') private readonly bookingModel: Model<Booking>) {}

  async getAllBookings(userId?: string): Promise<any> {
    let filter = {};
    if (userId) filter = { user: userId };

    const bookings = await this.bookingModel.find(filter).exec();
    return {
      status: 'success',
      results: bookings.length,
      data: { bookings },
    };
  }

  async createBooking(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    if (!createBookingDto.user) createBookingDto.user = userId;

    const newBooking = await this.bookingModel.create(createBookingDto);
    return newBooking;
  }

  async getBooking(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) throw new NotFoundException('No booking found with that ID');
    return booking;
  }

  async updateBooking(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedBooking) throw new NotFoundException('No booking found with that ID');
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    const result = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('No booking found with that ID');
  }
}
