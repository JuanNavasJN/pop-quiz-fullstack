import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/users.schema';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomstring from 'randomstring';
import { MailService } from './../mail/mail.service';
import { ResetAuthDto } from './dto/reset-auth.dto';
import {
  CREDENTIALS_INCORRECT,
  EMAIL_NOT_FOUND,
  EMAIL_SENT,
  PASSWORD_RESET,
  RESET_TOKEN_NOT_FOUND,
  USER_ALREADY_EXISTS,
} from 'src/constants';
import { UserRegisterAuthDto } from './dto/user-register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(@Body() userObject: UserRegisterAuthDto) {
    const { password, email } = userObject;

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException(USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }

    try {
      const plainToHash = await hash(password, 10);
      userObject = { ...userObject, password: plainToHash };

      const createdUser = await this.userModel.create(userObject);

      return this.sanitizeUser(createdUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(@Body() userObject: UserAuthDto) {
    const { email, password } = userObject;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, user.password);

    if (!checkPassword)
      throw new HttpException(CREDENTIALS_INCORRECT, HttpStatus.FORBIDDEN);

    try {
      const payload = {
        id: user._id,
      };

      const token = this.jwtService.sign(payload);

      return {
        user: this.sanitizeUser(user),
        token,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // return user object without password
  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    delete sanitized['passwordResetToken'];
    return sanitized;
  }

  async forgotPassowrd(@Body() forgotObject: ForgotAuthDto) {
    const { email } = forgotObject;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND);

    try {
      const resetToken = randomstring.generate(32);

      user.passwordResetToken = resetToken;
      await user.save();

      await this.mailService.sendUserConfirmation(user, resetToken);

      return {
        message: EMAIL_SENT,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassowrd(@Body() resetObject: ResetAuthDto) {
    const { newPassword, resetToken } = resetObject;

    const user = await this.userModel.findOne({
      passwordResetToken: resetToken,
    });

    if (!user)
      throw new HttpException(RESET_TOKEN_NOT_FOUND, HttpStatus.NOT_FOUND);

    try {
      user.password = await hash(newPassword, 10);
      user.passwordResetToken = undefined;
      await user.save();

      return {
        message: PASSWORD_RESET,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
