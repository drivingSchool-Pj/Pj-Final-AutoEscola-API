import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Schedules } from "./schedules.entity";

@Entity("location")
class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 95 })
  street: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 35 })
  city: string;

  @Column({ length: 100 })
  complement: string;

  @ManyToOne(() => Schedules, (schedules) => schedules.location)
  schedules: Schedules;
}

export { Location };
