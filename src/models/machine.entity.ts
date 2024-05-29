import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Departure from "./departure.entity"

@Entity()
export default class Machine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({default: false})
    type!: string

    @OneToMany(() => Departure, departure => departure.machine)
    departures!: Departure[]
}
