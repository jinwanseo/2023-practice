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
exports.User = exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
var UserRole;
(function (UserRole) {
    UserRole["Client"] = "Client";
    UserRole["Owner"] = "Owner";
    UserRole["Delivery"] = "Delivery";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole' });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (_a) {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async comparePassword(password) {
        try {
            return bcrypt.compare(password, this.password);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)((type) => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ select: false }),
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserRole),
    (0, typeorm_1.Column)({ enum: UserRole, type: 'enum' }),
    (0, graphql_1.Field)((type) => UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.InputType)('UserType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map