import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Station } from "./entity/station";
import { Journey } from "./entity/journey";
import { ROWS_PER_PAGE } from "./constants";


const handleStationGet = async (_: Request, res: Response) => {
    return res.send({ stationId: 103 });
};

const fetchStations = async (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page as string);

    const stations = await AppDataSource
        .getRepository(Station)
        .createQueryBuilder("station")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany();

    return res.send(stations);
}

const fetchJourneys = async (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page as string);

    const journeys = await AppDataSource
        .getRepository(Journey)
        .createQueryBuilder("journey")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany();

    return res.send(journeys);
}

// const importStations = (req: Request, res: Response) => {
//     return res.sendStatus(301);
// }


const main = async () => {
    const app = express();

    app.use(express.json());

    AppDataSource.initialize()
        .catch((err) => console.log(err));

    app.route("/api/station/:page")
        .get(fetchStations);

    app.route("/api/journey/:page")
        .get(fetchJourneys);

    app.route("/api/station/:stationId")
        .get(handleStationGet);

    app.listen(8080, () => {
        console.log("App is listening at port 8080");
    });
};

main().catch((err) => {
    console.error(err)
});