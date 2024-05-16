import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Token from "./token.entity"
import Departure from "./departure.entity"
import Arrival from "./arrival.entity"

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    category!: string

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[]

    @OneToMany(()=> Departure, departure => departure.user)
    departures?: Departure[]

    @OneToMany(()=> Arrival, arrival => arrival.user)
    arrivals?: Arrival[]
}