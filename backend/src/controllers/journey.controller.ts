import "reflect-metadata";
import { Request, Response } from "express";
import { FindOptionsWhere, ILike } from "typeorm";

import { AppDataSource } from "../data-source";
import { ROWS_PER_PAGE, __test__ } from "../constants";
import { JourneyView } from "../entity/journeyView.entity";
import { Journey } from "../entity/journey.entity";
import { PageRequestParams, JourneyRequestQueries } from "../util/pageRequests";


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
            if (!__test__)
                console.error(err);
            
            return res.sendStatus(400);
        });
};

/**
 * Save Journey data.
 */
export const saveJourney = async (req: Request<any, Journey | undefined, Journey, any>, res: Response) => {
    // Check if there are already journeys with the same
    // primary keys, send 400 status if found any.
    const count: number = await AppDataSource
        .getRepository(Journey)
        .countBy({
            departure_time: req.body.departure_time,
            return_time: req.body.return_time,
            departure_station_id: req.body.departure_station_id,
            return_station_id: req.body.return_station_id
        });

    if (count > 0)
        return res.sendStatus(400);

    // Save journey data if no journey with the same primary key was found.
    const savedJourney = await AppDataSource
        .getRepository(Journey)
        .save(req.body);
    
    return res
        .status(201)
        .send(savedJourney);
};