"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_interfaces_1 = require("./email.interfaces");
const email_constants_1 = require("./email.constants");
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
        this.baseURL = 'https://api.mailgun.net/v3';
        this.headerOption = {
            Authorization: `Basic ${Buffer.from(`api:${this.config.get(email_constants_1.MAIL_KEY)}`).toString('base64')}`,
        };
    }
    async sendEmail({ to, template, vars, }) {
        const formData = new FormData();
        formData.append('from', `Together LAB <${this.config.get(email_constants_1.MAIL_FROM)}>`);
        formData.append('to', to);
        formData.append('template', template);
        vars === null || vars === void 0 ? void 0 : vars.forEach((v) => formData.append(`v:${v.key}`, v.value));
        const res = await fetch(`${this.baseURL}/${this.config.get(email_constants_1.MAIL_DOMAIN)}/messages`, {
            method: 'POST',
            headers: Object.assign({}, this.headerOption),
            body: formData,
        });
        console.log(res);
    }
    async verifyEmail({ to, code }) {
        this.sendEmail({
            to,
            template: email_interfaces_1.MailTemplate.Verify,
            vars: [{ key: 'code', value: code }],
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map