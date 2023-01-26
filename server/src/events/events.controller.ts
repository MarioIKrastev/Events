import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators';
import JwtAuthGuard from 'src/common/guards/jwtAuthorization.guard';
import ReqWithUser from 'src/common/interfaces/ReqWithUser.interface';
import { User } from 'src/typeorm';
import { EventDto } from './dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) { }

  @Public()
  @Post('add')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  postEvent(@Body() dto: EventDto, @Req() req: ReqWithUser) {
    return this.eventsService.postEvent(dto, req.user);
  }

  @Public()
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.eventsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: EventDto) {
    return this.eventsService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: any) {
    try {
      res.status(200).json('Deleted successfully')
      return this.eventsService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
