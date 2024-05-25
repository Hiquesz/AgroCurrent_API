import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Arrival from "./arrival.entity"

@Entity()
export default class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => Arrival, arrival => arrival.report)
    arrival!: Arrival
}