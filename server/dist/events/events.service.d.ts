import { Event } from 'src/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    postEvent(dto: EventDto): string;
    getAll(): string;
    findOne(id: number): string;
    update(id: number, dto: EventDto): string;
    remove(id: number): string;
}
