import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators';
import { User } from 'src/typeorm';
import { EventDto } from './dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) { }

  @Public()
  @Post('add')
  @HttpCode(HttpStatus.OK)
  postEvent(@Body() dto: EventDto, user: User) {
    return this.eventsService.postEvent(dto,user);
  }

  @Public()
  @Get('events')
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
