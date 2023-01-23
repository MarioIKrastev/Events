import { Event, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto';
import { EventType } from './types';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    postEvent(dto: EventDto, user: User): Promise<EventType>;
    getAll(): string;
    findOne(id: number): string;
    update(id: number, dto: EventDto): string;
    remove(id: number): string;
}
