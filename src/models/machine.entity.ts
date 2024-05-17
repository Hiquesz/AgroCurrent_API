import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm"
import Departure from "./departure.entity"

@Entity()
export default class Machine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({default: false})
    type!: string

    @OneToOne(() => Departure, departure => departure.machine)
    departures!: Departure[]
}
