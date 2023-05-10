import { ConfigService } from '@nestjs/config';
import { MailVerifyOption } from './email.interfaces';
export declare class EmailService {
    private readonly config;
    private baseURL;
    private headerOption;
    constructor(config: ConfigService);
    private sendEmail;
    verifyEmail({ to, code }: MailVerifyOption): Promise<void>;
}
