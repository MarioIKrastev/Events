import { User } from 'src/entities/auth.entity';
import { Event } from 'src/entities/event.entity';
declare const entities: (typeof Event | typeof User)[];
export { User, Event };
export default entities;
