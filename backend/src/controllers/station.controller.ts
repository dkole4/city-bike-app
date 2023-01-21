import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station.entity";
import { ROWS_PER_PAGE } from "../constants";
import { StationView } from "../entity/stationView.entity";
import { PageRequestParams, PageRequestQueries } from "../util/pageRequests";

/**
 * Fetch a page of stations.
 */
export const fetchStationPage = (
    req: Request<PageRequestParams, any, any, PageRequestQueries>,
    res: Response
) => {
    const page: number = req.params.page;
    const sortBy: string | undefined = req.query.sortBy;
    const order: string | undefined = req.query.order;

    AppDataSource
        .getRepository(Station)
        .find({
            order: (sortBy && order) ? { [sortBy]: order } : undefined,
            skip: ROWS_PER_PAGE * page,
            take: ROWS_PER_PAGE
        })
        .then((stations: Station[]) => {
            return res.send(stations);
        })
        .catch((err) => {
            console.error(err);
            return res.sendStatus(400);
        });
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
        .catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
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
        .catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
};