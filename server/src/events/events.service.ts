import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto';
import { EventType } from './types'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) { }
  async postEvent(dto: EventDto, user: User): Promise<EventType> {
    const event = await this.eventRepository.create({
      title: dto.title,
      description: dto.description,
      type: dto.type,
      day: dto.day,
      month: dto.month,
      year: dto.year,
      user,
    })
    await this.eventRepository.save(event);
    return event;
  }

  getAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, dto: EventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
