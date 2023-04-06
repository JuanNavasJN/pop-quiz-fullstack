import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(@Request() req) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMe(@Request() req) {
    return this.usersService.findMe(req.user.userId);
  }
}
