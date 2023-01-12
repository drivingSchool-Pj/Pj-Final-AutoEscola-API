import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 95 })
  street: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  number: string;

  @Column({ length: 35 })
  city: string;

  @Column({ length: 100 })
  complement: string;
}
