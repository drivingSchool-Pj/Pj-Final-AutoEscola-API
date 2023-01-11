import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity("instructors")
class Instructors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => Categories, (categories) => categories.instructors)
  categories: Categories;

  @OneToMany(() => Schedules, (schedules) => schedules.instructors)
  schedules: Schedules[];
}

export { Instructors };
