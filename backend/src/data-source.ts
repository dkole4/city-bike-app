import { DataSource } from "typeorm";
import { Station } from "./entity/station";
import { Journey } from "./entity/journey";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",  // "db" as the name of database container in docker-compose
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "testdb",
    logging: true,
    entities: [Station, Journey],
    subscribers: [],
    migrations: [],
});