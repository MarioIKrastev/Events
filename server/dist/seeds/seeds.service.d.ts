import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AdminSeed } from 'src/auth/types';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class SeedsService implements OnModuleInit {
    private user;
    private conf;
    private hash;
    constructor(user: Repository<User>, conf: ConfigService, hash: AuthService);
    onModuleInit(): Promise<AdminSeed>;
}
