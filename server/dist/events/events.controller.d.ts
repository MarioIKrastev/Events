import { User } from 'src/typeorm';
import { EventDto } from './dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    postEvent(dto: EventDto, user: User): Promise<import("src/typeorm").Event>;
    getAll(): Promise<import("src/typeorm").Event[]>;
    findOne(id: string): string;
    update(id: string, dto: EventDto): string;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
