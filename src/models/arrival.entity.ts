import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm"
import Departure from "./departure.entity"
import User from "./user.entity"
import Report from "./report.entity"
import Sensor from "./sensor.entity"
import Images_Arrival from "./images_arrival.entity"

@Entity()
export default class Arrival extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    date_inspection?: Date
    
    @Column()
    date_arrival?: Date

    @Column({name: 'departure_id'})
    departureId!: number

    @Column({name: 'user_id'})
    userId?: number

    @ManyToOne(() => User, user => user.arrivals)
    user?: User

    @OneToOne(()=> Report, report => report.arrival)
    report!: Report

    @OneToOne(() => Departure, departure => departure.arrival)
    departure!: Departure

    @OneToMany(() => Sensor, sensor => sensor.arrival)
    sensors?: Sensor[]

    @OneToMany(() => Images_Arrival, ia => ia.arrival)
    images?: Images_Arrival[]
}
