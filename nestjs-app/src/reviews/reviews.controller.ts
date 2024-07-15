import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestrictTo } from '../auth/restrict-to.decorator';

@Controller('hotels/:hotelId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getAllReviews(@Param('hotelId') hotelId: string) {
    return await this.reviewsService.getAllReviews(hotelId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async createReview(@Param('hotelId') hotelId: string, @Body() createReviewDto: CreateReviewDto, @Req() req) {
    const newReview = await this.reviewsService.createReview(createReviewDto, hotelId, req.user.id);
    return {
      status: 'success',
      message: 'Review added successfully',
      data: { review: newReview },
    };
  }

  @Get(':id')
  async getReview(@Param('id') id: string) {
    const review = await this.reviewsService.getReview(id);
    return { status: 'success', data: { review } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    const updatedReview = await this.reviewsService.updateReview(id, updateReviewDto);
    return { status: 'success', data: { review: updatedReview } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RestrictTo('user')
  async deleteReview(@Param('id') id: string) {
    await this.reviewsService.deleteReview(id);
    return { status: 'success', data: null };
  }
}
