import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Station {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;
}