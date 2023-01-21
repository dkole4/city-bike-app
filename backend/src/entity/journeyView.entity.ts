import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
        SELECT "journey"."departure_time" AS "departure_time",
               "journey"."return_time" AS "return_time",
               "journey"."departure_station_id" AS "departure_station_id",
               "journey"."return_station_id" AS "return_station_id",
               "journey"."covered_distance" AS "covered_distance",
               "journey"."duration" AS "duration",
               "departure_station"."name" AS "departure_station_name",
               "return_station"."name" AS "return_station_name"
        FROM "journey" "journey"
        LEFT JOIN "station" "departure_station"
            ON "departure_station"."id" = "journey"."departure_station_id"
        LEFT JOIN "station" "return_station" 
            ON "return_station"."id" = "journey"."return_station_id"
    `
})
export class JourneyView {
    @ViewColumn()
    departure_time!: Date;

    @ViewColumn()
    return_time!: Date;

    @ViewColumn()
    departure_station_id!: number;

    @ViewColumn()
    return_station_id!: number;

    @ViewColumn()
    covered_distance!: number;

    @ViewColumn()
    duration!: number;

    @ViewColumn()
    public departure_station_name!: string;

    @ViewColumn()
    public return_station_name!: string;
}