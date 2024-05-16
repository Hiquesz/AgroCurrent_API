import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import Departure from "./departure.entity"
import User from "./user.entity"

@Entity()
export default class Arrival extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    date_inspection!: Date
    
    @Column()
    date_arrival!: Date

    /*@Column()
    pics!: */

    @Column({name: 'departure_id'})
    departureId!: number

    @Column({name: 'user_id'})
    userId!: number

    @ManyToOne(() => User, user => user.arrivals)
    user!: User

    @OneToOne(() => Departure, departure => departure.arrival)
    departure!: Departure
}