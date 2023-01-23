import { Role } from 'src/enum';
import { Event } from './event.entity';
export declare class User {
    id: string;
    username: string;
    role: Role;
    email: string;
    password: string;
    refreshToken: string;
    events: Event[];
}
