import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventType } from 'src/enum';
import { User } from './auth.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn({
        name: 'event_id',
    })
    id: string

    @Column({
        name: 'title',
        nullable: false,
    })
    title: string

    @Column({
        name: 'description',
        nullable: false,
    })
    description: string

    @Column({
        name: 'event-type',
        nullable: true,
    })
    type: string

    @Column({
        name: 'day',
        nullable: false,
    })
    day: string

    @Column({
        name: 'month',
        nullable: false,
    })
    month: string

    @Column({
        name: 'year',
        nullable: false,
    })
    year: string 

    @ManyToOne(type => User, (user: User) => user.events)
    user: User
}