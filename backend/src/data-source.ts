import { DataSource } from "typeorm";

import { Station } from "./entity/station";
import { Journey } from "./entity/journey";
import { StationView } from "./entity/stationView";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
        ? parseInt(process.env.DB_PORT)
        : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [Station, StationView, Journey],
    subscribers: [],
    migrations: ["./migration/**/*.ts"],
});