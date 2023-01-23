import "reflect-metadata";
import { Request, Response } from "express";
import { FindOptionsWhere, ILike } from "typeorm";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station.entity";
import { ROWS_PER_PAGE } from "../constants";
import { StationView } from "../entity/stationView.entity";
import { PageRequestParams, StationRequestQueries } from "../util/pageRequests";

/**
 * Fetch a page of stations.
 */
export const fetchStationPage = (
    req: Request<PageRequestParams, any, any, StationRequestQueries>,
    res: Response
) => {
    // Request parameters.
    const page: number = req.params.page;

    // Request queries.
    const sortBy: string | undefined = req.query.sortBy;
    const order: string | undefined = req.query.order;
    // Add conditions only if queries for name and address were defined.
    const whereConditions: FindOptionsWhere<Station>[] = [
        ...(req.query.name ? [{ name: ILike(`%${req.query.name}%`) }] : []),
        ...(req.query.address ? [{ address: ILike(`%${req.query.address}%`) }] : [])
    ];

    AppDataSource
        .getRepository(Station)
        .findAndCount({
            order: (sortBy && order) ? { [sortBy]: order } : undefined,
            where: whereConditions.length > 0 ? whereConditions : undefined,
            skip: ROWS_PER_PAGE * page,
            take: ROWS_PER_PAGE
        })
        .then(([stations, size]: [Station[], number]) => {
            return res.send({ 
                pages: Math.ceil(size / ROWS_PER_PAGE),
                data: stations
            });
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