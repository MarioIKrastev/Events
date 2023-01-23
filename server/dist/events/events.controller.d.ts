import { User } from 'src/typeorm';
import { EventDto } from './dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    postEvent(dto: EventDto, user: User): Promise<import("./types").EventType>;
    getAll(): string;
    findOne(id: string): string;
    update(id: string, dto: EventDto): string;
    remove(id: string): string;
}
