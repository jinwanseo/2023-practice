export declare enum MailTemplate {
    Verify = "verify-email"
}
type MailVariable = {
    key: string;
    value: string;
};
export interface MailHeader {
    Authorization: string;
}
export interface MailSendOption {
    to: string;
    template: MailTemplate;
    vars: MailVariable[];
}
export interface MailVerifyOption {
    to: string;
    code: string;
}
export {};
