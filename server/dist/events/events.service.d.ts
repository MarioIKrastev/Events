import { Event, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    postEvent(dto: EventDto, user: User): Promise<Event>;
    getAll(): Promise<Event[]>;
    findOne(id: number): string;
    update(id: number, dto: EventDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
