import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Instructors } from "./instructors.entity";
import { Location } from "./location.entity";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Instructors, (instructors) => instructors.schedules)
  instructors: Instructors;

  @OneToMany(() => Location, (location) => location.schedules)
  location: Location[];
}
