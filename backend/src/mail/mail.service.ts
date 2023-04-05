import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schema/users.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, resetToken: string) {
    const url = `${process.env.FRONTEND_HOST}/auth/reset/${resetToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: './reset-password',
      context: {
        url,
        userName: user.name,
      },
    });
  }
}
