import { DataSource } from "typeorm";

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
    entities: [__dirname + "/**/*.entity.{js,ts}"],
    subscribers: [],
    migrations: ["./migration/**/*.ts"],
});