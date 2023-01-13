import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Result } from './types/result.type';
export declare class AuthService {
    private authRepository;
    private jwtService;
    constructor(authRepository: Repository<User>, jwtService: JwtService);
    signUpLocal(dto: AuthDto, res: Response): Promise<Tokens>;
    signInLocal(dto: AuthDto, res: Response): Promise<Tokens>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    deleteLocalUser(userId: string): Promise<Result>;
    refreshToken(userId: string, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashData(data: string): string;
    getTokens(userId: string, email: string, username: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: string, rt: string): Promise<void>;
}
