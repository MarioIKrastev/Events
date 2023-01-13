import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
  Delete,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, User } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return await this.authService.signInLocal(dto, res);
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response,): Promise<Tokens> {
    return await this.authService.signUpLocal(dto, res);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @User('id') id: string,
  ) {
    res.clearCookie('Bearer');
    return await this.authService.logout(id);
  }
  @Public()
  @UseGuards(AtGuard)
  @Delete('local/user/:id')
  @HttpCode(HttpStatus.OK)
  async deleteLocalUser(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    res.clearCookie('Bearer');
    return await this.authService.deleteLocalUser(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request, @User('id') id: string) {
    return await this.authService.refreshToken(id, req.user['refreshToken']);
  }
}
