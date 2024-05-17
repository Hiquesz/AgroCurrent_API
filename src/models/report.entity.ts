import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Arrival from "./arrival.entity"

@Entity()
export default class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'arrival_id'})
    arrivalId!: number

    @OneToOne(() => Arrival, arrival => arrival.report)
    arrival!: Arrival
}