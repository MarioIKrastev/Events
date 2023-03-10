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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
let EventsService = class EventsService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async postEvent(dto, user) {
        const event = await this.eventRepository.create(Object.assign(Object.assign({}, dto), { user }));
        await this.eventRepository.save(event);
        return event;
    }
    async getAll() {
        return await this.eventRepository.find({ relations: ['user'] });
    }
    findOne(id) {
        return `This action returns a #${id} event`;
    }
    update(id, dto) {
        return `This action updates a #${id} event`;
    }
    async remove(id) {
        try {
            return await this.eventRepository.delete(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Event)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map