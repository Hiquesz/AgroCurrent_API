import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Departure from "./departure.entity"
import Sensor from './sensor.entity'

@Entity()
export default class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'departure_id'})
    departureId!: number

    @Column({name: 'sensor_id'})
    sensorId!: number

    @OneToMany(()=> Sensor, sensor => sensor.report)
    sensors?: Sensor[]

    @OneToOne(() => Departure, departure => departure.arrival)
    departure!: Departure
}