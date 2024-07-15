import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async getAllRooms(hotelId?: string): Promise<any> {
    let filter = {};
    if (hotelId) filter = { hotel: hotelId };

    const rooms = await this.roomModel.find(filter).exec();
    return {
      status: 'success',
      results: rooms.length,
      data: { rooms },
    };
  }

  async createRoom(createRoomDto: CreateRoomDto, hotelId: string): Promise<Room> {
    if (!createRoomDto.hotel) createRoomDto.hotel = hotelId;

    const newRoom = await this.roomModel.create(createRoomDto);
    return newRoom;
  }

  async getRoom(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) throw new NotFoundException('No room found with that ID');
    return room;
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedRoom) throw new NotFoundException('No room found with that ID');
    return updatedRoom;
  }

  async deleteRoom(id: string): Promise<void> {
    const result = await this.roomModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('No room found with that ID');
  }
}
