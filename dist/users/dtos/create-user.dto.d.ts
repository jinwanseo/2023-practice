import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const CreateUserInput_base: import("@nestjs/common").Type<Pick<User, "email" | "password" | "role">>;
export declare class CreateUserInput extends CreateUserInput_base {
}
export declare class CreateUserOutput extends CoreOutput {
}
export {};
