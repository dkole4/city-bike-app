import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station";
import { ROWS_PER_PAGE } from "../constants";
import { StationView } from "../entity/stationView";

/**
 * Fetch a page of stations.
 */
export const fetchStationPage = (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page);

    AppDataSource
        .getRepository(Station)
        .createQueryBuilder("station")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany()
        .then((stations: Station[]) => {
            return res.send(stations);
        })
        .catch((err) => console.error(err));
};

/**
 * Fetch station data using its id.
 */
export const fetchStation = (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId);

    AppDataSource
        .getRepository(Station)
        .findOneBy({ id: stationId })
        .then((station: Station | null) => {
            if (!station)
                return res.sendStatus(404);

            return res.send(station);
        })
        .catch((err) => console.error(err));
};

/**
 * Fetch StationView using station id.
 */
export const fetchStationView = (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId);

    AppDataSource
        .manager
        .findOneBy(StationView, { id: stationId })
        .then((station: StationView | null) => {
            if (!station)
                return res.sendStatus(404);

            return res.send(station);
        })
        .catch((err) => console.error(err));
};