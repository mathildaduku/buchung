// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestrictTo } from '../auth/restrict-to.decorator';

@Controller('users/:userId/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async getAllBookings(@Param('userId') userId: string) {
    return await this.bookingsService.getAllBookings(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async createBooking(@Param('userId') userId: string, @Body() createBookingDto: CreateBookingDto, @Req() req) {
    const newBooking = await this.bookingsService.createBooking(createBookingDto, req.user.id);
    return {
      status: 'success',
      message: 'Booking created successfully',
      data: { booking: newBooking },
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async getBooking(@Param('id') id: string) {
    const booking = await this.bookingsService.getBooking(id);
    return { status: 'success', data: { booking } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    const updatedBooking = await this.bookingsService.updateBooking(id, updateBookingDto);
    return { status: 'success', data: { booking: updatedBooking } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async deleteBooking(@Param('id') id: string) {
    await this.bookingsService.deleteBooking(id);
    return { status: 'success', data: null };
  }
}
