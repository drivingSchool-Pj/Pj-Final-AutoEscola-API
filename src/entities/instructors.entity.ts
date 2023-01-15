import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Categories } from './categories.entity'
import { Schedules } from './schedules.entity'
import { User } from './user.entity'

@Entity('instructors')
export class Instructors {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @ManyToOne(() => Categories, categories => categories.instructors)
  categories: Categories

  @OneToMany(() => Schedules, schedules => schedules.instructors)
  schedules: Schedules[]
}
