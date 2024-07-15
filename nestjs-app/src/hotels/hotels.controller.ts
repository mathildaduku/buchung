import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    const newHotel = await this.hotelsService.create(createHotelDto);
    return {
      status: 'success',
      data: { hotel: newHotel },
    };
  }

  @Get()
  async getAllHotels(@Query() query: any) {
    return await this.hotelsService.findAll(query);
  }

  @Get(':id')
  async getHotel(@Param('id') id: string) {
    const hotel = await this.hotelsService.findOne(id);
    return { status: 'success', data: { hotel } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async updateHotel(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    const updatedHotel = await this.hotelsService.update(id, updateHotelDto);
    return { status: 'success', data: { hotel: updatedHotel } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async deleteHotel(@Param('id') id: string) {
    await this.hotelsService.remove(id);
    return { status: 'success', data: null };
  }
}
