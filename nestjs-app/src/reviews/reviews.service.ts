import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Review>) {}

  async getAllReviews(hotelId?: string): Promise<any> {
    let filter = {};
    if (hotelId) filter = { hotel: hotelId };

    const reviews = await this.reviewModel.find(filter).exec();
    return {
      status: 'success',
      results: reviews.length,
      data: { reviews },
    };
  }

  async createReview(createReviewDto: CreateReviewDto, hotelId: string, userId: string): Promise<Review> {
    if (!createReviewDto.hotel) createReviewDto.hotel = hotelId;
    if (!createReviewDto.user) createReviewDto.user = userId;

    const newReview = await this.reviewModel.create(createReviewDto);
    return newReview;
  }

  async getReview(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) throw new NotFoundException('No review found with that ID');
    return review;
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedReview) throw new NotFoundException('No review found with that ID');
    return updatedReview;
  }

  async deleteReview(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('No review found with that ID');
  }
}
