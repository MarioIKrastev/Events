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
exports.SeedsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const enum_1 = require("../enum");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
let SeedsService = class SeedsService {
    constructor(user, conf, hash) {
        this.user = user;
        this.conf = conf;
        this.hash = hash;
    }
    async onModuleInit() {
        const isAdmin = await this.user.findOne({
            where: {
                role: enum_1.Role.ADMIN,
            },
        });
        const boss = {
            username: this.conf.get('USER_NAME'),
            email: this.conf.get('USER_EMAIL'),
            password: this.hash.hashData(this.conf.get('USER_PASSWORD')),
            role: enum_1.Role.ADMIN,
        };
        if (!isAdmin) {
            const admin = this.user.create(boss);
            console.log('-------Admin Role has been implemented-------');
            return await this.user.save(admin);
        }
        console.log('-------There is already an admin role-------');
        return null;
    }
};
SeedsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        config_1.ConfigService,
        auth_service_1.AuthService])
], SeedsService);
exports.SeedsService = SeedsService;
//# sourceMappingURL=seeds.service.js.map