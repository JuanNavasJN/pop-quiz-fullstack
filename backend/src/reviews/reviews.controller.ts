import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles, Role } from 'src/auth/roles';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiBearerAuth()
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() reviewObject: CreateReviewDto, @Request() req) {
    return this.reviewsService.create(reviewObject, req.user.id);
  }

  @Get('/events/:eventId')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllByEventId(@Param('eventId') eventId: string) {
    return this.reviewsService.findAllByEventId(eventId);
  }
}
