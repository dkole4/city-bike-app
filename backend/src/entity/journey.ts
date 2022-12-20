import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Station } from "./station";

@Entity()
export class Journey {
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
    public departure_station!: Station;

    @ManyToOne(() => Station, (station) => station.id)
    @JoinColumn({ name: "return_station_id" })
    public return_station!: Station;
}