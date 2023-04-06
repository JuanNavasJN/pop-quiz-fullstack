import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Event, EventDocument } from './schema/events.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Review, ReviewDocument } from 'src/reviews/schema/reviews.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(@Body() eventObject: CreateEventDto, userId: string) {
    return this.eventModel.create({
      ...eventObject,
      createdBy: userId,
    });
  }

  async findAll() {
    const events = await this.eventModel.find({});
    const eventsWithRating = [];

    for (const event of events) {
      // Calculate event rating by every review
      const reviews = await this.reviewModel.find({ event: event._id });
      let rating = 0;
      const sum = reviews.reduce((prev, curr) => curr.rating + prev, 0);

      if (sum) rating = sum / reviews.length;

      eventsWithRating.push({
        ...event.toObject(),
        rating,
      });
    }

    return eventsWithRating;
  }

  async delete(eventId: string) {
    return await this.eventModel.findByIdAndDelete(eventId);
  }

  async findOne(eventId: string) {
    return await this.eventModel.findById(eventId);
  }
}
