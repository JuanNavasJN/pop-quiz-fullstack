import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Review, ReviewDocument } from './schema/reviews.schema';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { sanitizeUser } from 'src/users/users.helpers';
import { UserDocument } from 'src/users/schema/users.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(@Body() reviewObject: CreateReviewDto, userId: string) {
    return this.reviewModel.create({
      ...reviewObject,
      event: reviewObject.eventId,
      createdBy: userId,
    });
  }

  async findAllByEventId(eventId: string) {
    const reviews = await this.reviewModel
      .find({ event: eventId })
      .populate('createdBy');

    return reviews.map((review) => ({
      ...review.toObject(),
      createdBy: sanitizeUser(review.createdBy as UserDocument),
    }));
  }
}
