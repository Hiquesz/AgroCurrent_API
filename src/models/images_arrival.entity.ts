import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm"
import Arrival from "./arrival.entity"

@Entity()
export default class Images_Arrival extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    address_image?: string
    
    @Column({name: 'arrival_id'})
    arrivalId?: number

    @ManyToOne(() => Arrival, arrival => arrival.images)
    arrival?: Arrival

}