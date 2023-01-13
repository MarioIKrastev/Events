"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const typeorm_2 = require("../typeorm");
const seeds_service_1 = require("./seeds.service");
let SeedsModule = class SeedsModule {
};
SeedsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.User]),
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule,
        ],
        providers: [auth_service_1.AuthService, seeds_service_1.SeedsService],
    })
], SeedsModule);
exports.SeedsModule = SeedsModule;
//# sourceMappingURL=seeds.module.js.map