import "reflect-metadata";
import express from "express";
import multer from "multer";
import os from "os";

import { AppDataSource } from "./data-source";
import { fetchStationDetailed, fetchStationPage } from "./controllers/station.controller";
import { importJourneyData, importStationData } from "./controllers/import.contoller";
import { fetchJourneyPage } from "./controllers/journey.controller";

// Temporary location of imported CSV files
const filePath: string = os.tmpdir();
const upload: multer.Multer = multer({ dest: filePath });

const main = async () => {
    const app = express();

    app.use(express.json());

    AppDataSource.initialize()
        .catch((err) => console.log(err));

    app.route("/api/station/:stationId")
        .get(fetchStationDetailed);

    app.route("/api/stations/:page")
        .get(fetchStationPage);

    app.route("/api/journeys/:page")
        .get(fetchJourneyPage);

    app.route("/api/import/journey")
        .post(upload.single("file"), importJourneyData);
    
    app.route("/api/import/station")
        .post(upload.single("file"), importStationData);

    app.listen(8080, () => {
        console.log("App is listening at port 8080");
    });
};

main().catch((err) => {
    console.error(err);
});