import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm"
import Departure from "./departure.entity"

@Entity()
export default class Images_Departure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    address_image?: string

    @ManyToOne(() => Departure, departure => departure.images)
    departure?: Departure
}