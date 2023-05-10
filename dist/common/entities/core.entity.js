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
exports.CoreEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let CoreEntity = class CoreEntity {
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], CoreEntity.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], CoreEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], CoreEntity.prototype, "createdAt", void 0);
CoreEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.InputType)({ isAbstract: true }),
    (0, graphql_1.ObjectType)()
], CoreEntity);
exports.CoreEntity = CoreEntity;
//# sourceMappingURL=core.entity.js.map