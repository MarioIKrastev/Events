import ReqWithUser from 'src/common/interfaces/ReqWithUser.interface';
import { EventDto } from './dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    postEvent(dto: EventDto, req: ReqWithUser): Promise<import("src/typeorm").Event>;
    getAll(): Promise<import("src/typeorm").Event[]>;
    findOne(id: string): string;
    update(id: string, dto: EventDto): string;
    remove(id: string, res: any): Promise<import("typeorm").DeleteResult>;
}
