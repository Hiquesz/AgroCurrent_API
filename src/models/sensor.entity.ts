import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Arrival from "./arrival.entity";

@Entity()
export default class Sensor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'time' })
    time!: string

    @Column()
    part_machine!: string

    @Column()
    localization!: string

    @Column()
    arrivalId!: number
    
    @ManyToOne(()=> Arrival, arrival => arrival.sensors)
    arrival!: Arrival
}