import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class Seeds implements OnModuleInit {
    private authRepository;
    private configService;
    constructor(authRepository: Repository<User>, configService: ConfigService);
    onModuleInit(): Promise<any>;
}
