import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MailHeader,
  MailSendOption,
  MailTemplate,
  MailVerifyOption,
} from './email.interfaces';
import { MAIL_DOMAIN, MAIL_FROM, MAIL_KEY } from './email.constants';

@Injectable()
export class EmailService {
  private baseURL = 'https://api.mailgun.net/v3';
  private headerOption: MailHeader;
  constructor(private readonly config: ConfigService) {
    this.headerOption = {
      Authorization: `Basic ${Buffer.from(
        `api:${this.config.get(MAIL_KEY)}`,
      ).toString('base64')}`,
    };
  }

  private async sendEmail({
    to,
    template,
    vars,
  }: MailSendOption): Promise<void> {
    const formData = new FormData();
    formData.append('from', `Together LAB <${this.config.get(MAIL_FROM)}>`);
    formData.append('to', to);
    formData.append('template', template);
    vars?.forEach((v) => formData.append(`v:${v.key}`, v.value));

    const res = await fetch(
      `${this.baseURL}/${this.config.get(MAIL_DOMAIN)}/messages`,
      {
        method: 'POST',
        headers: {
          ...this.headerOption,
        },
        body: formData,
      },
    );
    console.log(res);
  }

  async verifyEmail({ to, code }: MailVerifyOption): Promise<void> {
    this.sendEmail({
      to,
      template: MailTemplate.Verify,
      vars: [{ key: 'code', value: code }],
    });
  }
}
