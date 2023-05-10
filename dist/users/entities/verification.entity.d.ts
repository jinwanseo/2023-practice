import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from './user.entity';
export declare class Verification extends CoreEntity {
    code: string;
    user: User;
    makeCode(): void;
}
