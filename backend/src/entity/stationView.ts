import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    expression: `
        SELECT "station"."id" AS "id",
               "station"."name" AS "name",
               "station"."address" AS "address",
               "station"."longitude" AS "longitude",
               "station"."latitude" AS "latitude",
               COALESCE("departures"."departure_count", 0) AS "departure_count",
               COALESCE("departures"."distance" / "departures"."departure_count", 0)
                   AS "average_departure_distance",
               COALESCE("returns"."return_count", 0) AS "return_count",
               COALESCE("returns"."distance" / "returns"."return_count", 0)
                   AS "average_return_distance"
        FROM "station" "station"
        LEFT JOIN (
            SELECT "journey"."departure_station_id", 
                   COUNT("journey"."departure_station_id") AS "departure_count",
                   SUM("journey"."covered_distance") AS "distance"
            FROM "journey" "journey"
            GROUP BY "journey"."departure_station_id"
        ) AS "departures" ON "station"."id" = "departures"."departure_station_id"
        LEFT JOIN (
            SELECT "journey"."return_station_id", 
                   COUNT("journey"."return_station_id") AS "return_count",
                   SUM("journey"."covered_distance") AS "distance"
            FROM "journey" "journey"
            GROUP BY "journey"."return_station_id"
        ) AS "returns" ON "station"."id" = "returns"."return_station_id"
    `,
})
export class StationView {
    @ViewColumn()
    id!: number;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    longitude: number;

    @ViewColumn()
    latitude: number;

    @ViewColumn()
    departure_count: number;

    @ViewColumn()
    average_departure_distance: number;

    @ViewColumn()
    return_count: number;

    @ViewColumn()
    average_return_distance: number;
}