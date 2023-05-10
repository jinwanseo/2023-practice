import { CoreEntity } from 'src/common/entities/core.entity';
export declare enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery"
}
export declare class User extends CoreEntity {
    email: string;
    isVerified: boolean;
    password: string;
    role: UserRole;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
