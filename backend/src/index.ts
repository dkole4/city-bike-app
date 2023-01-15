import "reflect-metadata";

import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";
import { router as stationRouter } from "./routes/station.routes";
import { router as journeyRouter } from "./routes/journey.routes";
import { router as importRouter } from "./routes/import.routes";

const main = async () => {
    const app: express.Application = express();

    AppDataSource.initialize()
        .catch((err) => console.error(err));
    
    app.use(express.json());
    app.use(cors({ origin: process.env.CORS_ORIGIN }));

    // Add routes to the app.
    app.use(stationRouter);
    app.use(journeyRouter);
    app.use(importRouter);

    app.listen(process.env.NODE_PORT, () => {
        console.log("App is listening at port 8080");
    });
};

main().catch((err) => {
    console.error(err);
});