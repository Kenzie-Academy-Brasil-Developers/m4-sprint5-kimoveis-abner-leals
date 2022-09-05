import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Properties } from "./properties.entity";
import { User } from "./users.entity";

@Entity("schedules_users_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (prop) => prop.schedules, { eager: true })
  property: Properties;

  @ManyToOne(() => User, (user) => user.schedules, { eager: true })
  user: User;
}
