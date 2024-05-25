import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import Machine from "./machine.entity"
import User from "./user.entity"
import Arrival from "./arrival.entity"
import Images_Departure from "./images_dep.entity"

@Entity()
export default class Departure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    address!: string

    @Column()
    client!: string
    
    @Column()
    date_departure!: Date

    @ManyToOne(() => Machine, machine => machine.departures)
    machine!: Machine

    @ManyToOne(() => User, user => user.departures)
    user!: User

    @OneToOne(()=> Arrival, arrival => arrival.departure)
    arrival!: Arrival

    @ManyToOne(() => Images_Departure, id => id.departure)
    images?: Images_Departure[]
}
