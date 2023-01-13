import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AdminSeed } from 'src/auth/types';
import { Role } from 'src/enum';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private conf: ConfigService,
    private hash: AuthService,
  ) {}
  async onModuleInit(): Promise<AdminSeed> {
    const isAdmin = await this.user.findOne({
      where: {
        role: Role.ADMIN,
      },
    });
    const boss = {
      username: this.conf.get('USER_NAME'),
      email: this.conf.get('USER_EMAIL'),
      password: this.hash.hashData(this.conf.get('USER_PASSWORD')),
      role: Role.ADMIN,
    };

    if (!isAdmin) {
      const admin = this.user.create(boss);
      console.log('-------Admin Role has been implemented-------');
      return await this.user.save(admin);
    }
    console.log('-------There is already an admin role-------');
    return null;
  }
}
