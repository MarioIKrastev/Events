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
exports.AuthService = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async signUpLocal(dto, res) {
        const user = await this.authRepository.findOne({
            where: {
                email: dto.email,
            },
        });
        if (user) {
            res.status(400).json({ message: 'Email is already in use' });
        }
        else {
            const hashedPassword = this.hashData(dto.password);
            const newUser = this.authRepository.create({
                username: dto.username,
                email: dto.email,
                password: hashedPassword,
            });
            await this.authRepository.save(newUser);
            const tokens = await this.getTokens(newUser.id, newUser.email, newUser.username);
            await this.updateRtHash(newUser.id, tokens.refresh_token);
            return tokens;
        }
    }
    async signInLocal(dto, res) {
        const user = await this.authRepository.findOne({
            where: {
                email: dto.email,
            },
        });
        const isMatched = await bcrypt.compare(dto.password, user.password);
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        if (!user || !isMatched) {
            res.status(400).json({ message: 'Sign in failed! Please try again.' });
        }
        else {
            const tokens = await this.getTokens(user.id, user.email, user.username);
            res.cookie('Bearer', payload);
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
        }
    }
    async logout(userId) {
        const user = await this.authRepository.findOneBy({ id: userId });
        if (!user.refreshToken) {
            throw new common_1.ForbiddenException('User Not Found!');
        }
        user.refreshToken = '';
        await this.authRepository.save(user);
        return {
            message: 'Logged out',
        };
    }
    async deleteLocalUser(userId) {
        await this.authRepository.delete({ id: userId });
        return {
            statusCode: 200,
            message: 'Deleted successfully',
        };
    }
    async refreshToken(userId, rt) {
        const user = await this.authRepository.findOneBy({ id: userId });
        const rtMatches = await bcrypt.compare(rt, user.refreshToken);
        if (!user || !rtMatches)
            throw new common_1.ForbiddenException('No Token Provided! Please provide valid token!');
        const tokens = await this.getTokens(user.id, user.email, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    hashData(data) {
        return bcrypt.hashSync(data, 10);
    }
    async getTokens(userId, email, username) {
        const [at, rt] = await Promise.all([
            await this.jwtService.signAsync({
                id: userId,
                email,
                username,
            }, {
                secret: 'access-token-secret',
                expiresIn: 60 * 15,
            }),
            await this.jwtService.signAsync({
                id: userId,
                email,
                username,
            }, {
                secret: 'refresh-token-secret',
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(userId, rt) {
        const hash = this.hashData(rt);
        await this.authRepository
            .createQueryBuilder()
            .update(typeorm_2.User)
            .set({ refreshToken: hash })
            .where('id = :id', { id: userId })
            .execute();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map