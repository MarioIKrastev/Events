import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) { }
  async postEvent(dto: EventDto, user: User) {
    const event = await this.eventRepository.create({
      ...dto,
      user,
    })
    await this.eventRepository.save(event);
    return event;
  }

  async getAll() {
    return await this.eventRepository.find({relations:['user']});
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, dto: EventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    try {
      
      return await this.eventRepository.delete(id)
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
}
