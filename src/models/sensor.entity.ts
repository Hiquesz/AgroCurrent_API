import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Report from './report.entity'

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

    @ManyToOne(() => Report, report => report.sensors)
    report!: Report
}