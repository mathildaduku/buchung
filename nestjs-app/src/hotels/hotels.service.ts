import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { APIFeatures } from '../utils/apiFeatures';

@Injectable()
export class HotelsService {
  constructor(@InjectModel('Hotel') private readonly hotelModel: Model<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const newHotel = await this.hotelModel.create(createHotelDto);
    return newHotel;
  }

  async findAll(query: any): Promise<any> {
    const features = new APIFeatures(this.hotelModel.find(), query)
      .filter()
      .sort()
      .selectFields()
      .paginate();
    const hotels = await features.query;
    return {
      status: 'success',
      results: hotels.length,
      data: { hotels },
    };
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).populate({
      path: 'rooms',
      select: 'room_type price availability -hotel',
    }).exec();
    if (!hotel) throw new NotFoundException('No hotel found with that ID');
    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, updateHotelDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedHotel) throw new NotFoundException('No hotel found with that ID');
    return updatedHotel;
  }

  async remove(id: string): Promise<void> {
    const result = await this.hotelModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('No hotel found with that ID');
  }
}
