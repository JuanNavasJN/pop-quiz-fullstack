import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { BAD_REQUEST, USER_NOT_FOUND } from 'src/constants';
import { sanitizeUser } from './users.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModule: Model<UserDocument>,
  ) {}

  async findAll() {
    return await this.usersModule.find({}, { password: false });
  }

  async findMe(userId: string) {
    if (!userId) throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);

    const user = await this.usersModule.findById(userId);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return sanitizeUser(user);
  }
}
