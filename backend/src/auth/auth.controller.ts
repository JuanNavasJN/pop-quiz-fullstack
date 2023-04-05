import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterAuthDto } from './dto/user-register-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: UserRegisterAuthDto) {
    return this.authService.register(userObject);
  }

  @Post('login')
  loginUser(@Body() userObject: UserAuthDto) {
    return this.authService.login(userObject);
  }

  @Post('forgot')
  forgotPassowrd(@Body() forgotObject: ForgotAuthDto) {
    return this.authService.forgotPassowrd(forgotObject);
  }

  @Post('reset')
  resetPassowrd(@Body() resetObject: ResetAuthDto) {
    return this.authService.resetPassowrd(resetObject);
  }
}
