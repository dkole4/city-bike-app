import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";

import { Station } from "./station.entity";

@Entity()
export class Journey {
    @PrimaryColumn({ type: "timestamp" })
    departure_time!: Date;

    @PrimaryColumn({ type: "timestamp" })
    return_time!: Date;

    @PrimaryColumn()
    departure_station_id!: number;

    @PrimaryColumn()
    return_station_id!: number;

    @Column()
    covered_distance!: number;

    @Column()
    duration!: number;

    @ManyToOne(() => Station, (station) => station.id)
    @JoinColumn({ name: "departure_station_id" })
    public departure_station!: string;

    @ManyToOne(() => Station, (station) => station.id)
    @JoinColumn({ name: "return_station_id" })
    public return_station!: Station;
}