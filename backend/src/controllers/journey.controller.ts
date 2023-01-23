import "reflect-metadata";
import { Request, Response } from "express";
import { FindOptionsWhere, ILike } from "typeorm";

import { AppDataSource } from "../data-source";
import { ROWS_PER_PAGE } from "../constants";
import { JourneyView } from "../entity/journeyView.entity";
import { PageRequestParams, JourneyRequestQueries } from "src/util/pageRequests";


/**
 * Fetch a page of journeys.
 */
export const fetchJourneyPage = (
    req: Request<PageRequestParams, any, any, JourneyRequestQueries>,
    res: Response
) => {
    // Request parameters.
    const page: number = req.params.page;

    // Request queries.
    const sortBy: string | undefined = req.query.sortBy;
    const order: string | undefined = req.query.order;
    // Add conditions only if query for station name was defined.
    const whereConditions: FindOptionsWhere<JourneyView>[] =
        (req.query.stationName)
            ? [
                { departure_station_name: ILike(`%${req.query.stationName}%`) },
                { return_station_name: ILike(`%${req.query.stationName}%`) }
            ]
            : [];

    AppDataSource
        .getRepository(JourneyView)
        .findAndCount({
            order: (sortBy && order) ? { [sortBy]: order } : undefined,
            where: whereConditions.length > 0 ? whereConditions : undefined,
            skip: ROWS_PER_PAGE * page,
            take: ROWS_PER_PAGE
        })
        .then(([journeys, size]: [JourneyView[], number]) => {
            return res.send({
                pages: Math.ceil(size / ROWS_PER_PAGE),
                data: journeys
            });
        })
        .catch((err) => {
            console.error(err);
            return res.sendStatus(400);
        });
};