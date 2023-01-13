import * as bcrypt from 'bcryptjs';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Result } from './types/result.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUpLocal(dto: AuthDto, res: Response): Promise<Tokens> {
    const user = await this.authRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if(user){
      res.status(400).json({ message: 'Email is already in use' });
    }else{
      const hashedPassword = this.hashData(dto.password);
      const newUser = this.authRepository.create({
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      });
      await this.authRepository.save(newUser);
      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.username,
      );
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    }
  }

  async signInLocal(dto: AuthDto, res: Response): Promise<Tokens> {
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
    } else {
      const tokens = await this.getTokens(user.id, user.email, user.username);
      res.cookie('Bearer', payload);
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
    }
  }
  async logout(userId: string) {
    const user = await this.authRepository.findOneBy({ id: userId });

    if (!user.refreshToken) {
      throw new ForbiddenException('User Not Found!');
    }
    user.refreshToken = '';

    await this.authRepository.save(user);
    return {
      message: 'Logged out',
    };
  }
  async deleteLocalUser(userId: string): Promise<Result> {
    await this.authRepository.delete({ id: userId });

    return {
      statusCode: 200,
      message: 'Deleted successfully',
    };
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.authRepository.findOneBy({ id: userId });
    const rtMatches = await bcrypt.compare(rt, user.refreshToken);

    if (!user || !rtMatches)
      throw new ForbiddenException(
        'No Token Provided! Please provide valid token!',
      );

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  async getTokens(userId: string, email: string, username: string) {
    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: userId,
          email,
          username,
        },
        {
          secret: 'access-token-secret',
          expiresIn: 60 * 15,
        },
      ),
      await this.jwtService.signAsync(
        {
          id: userId,
          email,
          username,
        },
        {
          secret: 'refresh-token-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: string, rt: string) {
    const hash = this.hashData(rt);
    await this.authRepository
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken: hash })
      .where('id = :id', { id: userId })
      .execute();
  }
}
