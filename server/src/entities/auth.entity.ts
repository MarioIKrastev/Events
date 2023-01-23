import { Role } from 'src/enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: string;

  @Column({
    name: 'username',
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.REG,
  })
  role: Role;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
    default: '',
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'rfToken',
    default: '',
  })
  refreshToken: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
