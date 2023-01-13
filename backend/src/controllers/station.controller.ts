import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station";
import { ROWS_PER_PAGE } from "../constants";
import { StationView } from "../entity/stationView";

/**
 * Fetch a page of stations.
 */
export const fetchStationPage = async (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page);

    const stations: Station[] = await AppDataSource
        .getRepository(Station)
        .createQueryBuilder("station")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany();

    return res.send(stations);
};

/**
 * Fetch station data using its id.
 */
export const fetchStation = async (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId);

    const station: Station | null = await AppDataSource
        .getRepository(Station)
        .findOneBy({ id: stationId });
    
    if (!station)
        return res.sendStatus(404);

    return res.send(station);
};

/**
 * Fetch StationView using station id.
 */
export const fetchStationView = async (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId);

    const station: StationView | null = await AppDataSource
        .manager
        .findOneBy(StationView, { id: stationId });
    
    if (!station)
        return res.sendStatus(404);

    return res.send(station);
};