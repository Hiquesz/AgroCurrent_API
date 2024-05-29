import { BaseEntity, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Arrival from "./arrival.entity"
import User from "./user.entity"

@Entity()
export default class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => Arrival, arrival => arrival.report)
    arrival!: Arrival

    @ManyToOne(() => User, user => user.reports)
    user!: User
}