import { EventType } from 'src/enum';
import { User } from './auth.entity';
export declare class Event {
    id: string;
    title: string;
    description: string;
    type: EventType;
    day: string;
    month: string;
    year: string;
    user: User;
}
