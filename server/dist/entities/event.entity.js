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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enum");
const auth_entity_1 = require("./auth.entity");
let Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'event_id',
    }),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        nullable: false,
    }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: false,
    }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'event-type',
        type: 'enum',
        enum: enum_1.EventType,
        default: enum_1.EventType.DEFAULT
    }),
    __metadata("design:type", String)
], Event.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'day',
        nullable: false,
    }),
    __metadata("design:type", String)
], Event.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'month',
        nullable: false,
    }),
    __metadata("design:type", String)
], Event.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'year',
        nullable: false,
    }),
    __metadata("design:type", String)
], Event.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.User, (user) => user.events),
    (0, typeorm_1.JoinColumn)({ name: 'added_by' }),
    __metadata("design:type", auth_entity_1.User)
], Event.prototype, "user", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map