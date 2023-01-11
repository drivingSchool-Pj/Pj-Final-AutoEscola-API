import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeRemove,
} from "typeorm";
import { Address } from "./address.entity";
import { Schedules } from "./schedules.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 62 })
  email: string;

  @Column({ length: 72 })
  password: string;

  @Column()
  age: number;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true, type: "boolean" })
  isActive: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @CreateDateColumn({ type: "date" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeRemove()
  statusRemoved() {
    this.isActive = false;
  }

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Schedules, (schedules) => schedules.user)
  schedules: Schedules[];
}

export { User };
