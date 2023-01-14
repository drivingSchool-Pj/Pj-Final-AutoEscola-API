import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";
import { User } from "./user.entity";

@Entity("instructors")
export class Instructors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Categories, (categories) => categories.instructors)
  categories: Categories;

  @OneToMany(() => Schedules, (schedules) => schedules.instructors)
  schedules: Schedules[];
}
