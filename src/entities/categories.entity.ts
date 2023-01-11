import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Instructors } from "./instructors.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 2 })
  typeCategorie: string;

  @OneToMany(() => Instructors, (instructors) => instructors.categories)
  instructors: Instructors[];
}
