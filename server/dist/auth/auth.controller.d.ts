import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signInLocal(dto: AuthDto, res: Response): Promise<Tokens>;
    signUpLocal(dto: AuthDto, res: Response): Promise<Tokens>;
    logout(id: string): Promise<{
        message: string;
    }>;
    deleteLocalUser(id: string): Promise<import("./types").Result>;
    refreshToken(req: Request, id: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
