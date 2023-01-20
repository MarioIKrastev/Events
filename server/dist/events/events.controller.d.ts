import { EventDto } from './dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    postEvent(dto: EventDto): string;
    getAll(): string;
    findOne(id: string): string;
    update(id: string, dto: EventDto): string;
    remove(id: string): string;
}
