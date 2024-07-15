import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestrictTo } from '../auth/restrict-to.decorator';

@Controller('hotels/:hotelId/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getAllRooms(@Param('hotelId') hotelId: string) {
    return await this.roomsService.getAllRooms(hotelId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async createRoom(@Param('hotelId') hotelId: string, @Body() createRoomDto: CreateRoomDto) {
    const newRoom = await this.roomsService.createRoom(createRoomDto, hotelId);
    return {
      status: 'success',
      message: 'Room created successfully',
      data: { room: newRoom },
    };
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    const room = await this.roomsService.getRoom(id);
    return { status: 'success', data: { room } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const updatedRoom = await this.roomsService.updateRoom(id, updateRoomDto);
    return { status: 'success', data: { room: updatedRoom } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('admin')
  async deleteRoom(@Param('id') id: string) {
    await this.roomsService.deleteRoom(id);
    return { status: 'success', data: null };
  }
}
