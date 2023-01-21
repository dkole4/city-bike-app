import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Station {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    operator: string;

    @Column()
    capacity: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    /**
     * Check if station was only imported partially using
     * a list of journeys or fully using a list of stations.
     * 
     * Return true if database contain all the necessary
     * information of the station, false otherwise.
     * 
     * Address and location were chosen because they
     * are always present in the datasets and are mandatory
     * to have to show the location of a station to the user.
     */
    public get isFullyImported(): boolean {
        return (
            this.address != null &&
            this.longitude != null &&
            this.latitude != null
        );
    }
}