import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles, Role } from 'src/auth/roles';
import { CreateEventDto } from './dto/create-event.dto';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() eventObject: CreateEventDto, @Request() req) {
    return this.eventsService.create(eventObject, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventsService.findAll();
  }

  @Delete(':eventId')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  delete(@Param('eventId') eventId: string) {
    return this.eventsService.delete(eventId);
  }

  @Get(':eventId')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('eventId') eventId: string) {
    return this.eventsService.findOne(eventId);
  }
}
