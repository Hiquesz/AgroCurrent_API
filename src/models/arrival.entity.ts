import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm"
import Departure from "./departure.entity"
import User from "./user.entity"
import Report from "./report.entity"
import Sensor from "./sensor.entity"
import Images_Arrival from "./images_arrival.entity"

@Entity()
export default class Arrival extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: true})
    date_inspection?: Date
    
    @Column({nullable: true})
    date_arrival?: Date

    @ManyToOne(() => User, user => user.arrivals)
    user?: User

    @OneToOne(()=> Report)
    @JoinColumn()
    report!: Report

    @OneToOne(() => Departure, departure => departure.arrival)
    departure?: Departure

    @OneToMany(() => Sensor, sensor => sensor.arrival)
    sensors?: Sensor[]

    @OneToMany(() => Images_Arrival, ia => ia.arrival)
    images?: Images_Arrival[]
}
