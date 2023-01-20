import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { ROWS_PER_PAGE } from "../constants";
import { Journey } from "../entity/journey";
import { PageRequestParams, PageRequestQueries } from "src/util/pageRequests";


/**
 * Fetch a page of journeys.
 */
export const fetchJourneyPage = (
    req: Request<PageRequestParams, any, any, PageRequestQueries>,
    res: Response
) => {
    const page: number = req.params.page;
    const sortBy: string | undefined = req.query.sortBy;
    const order: string | undefined = req.query.order;

    AppDataSource
        .getRepository(Journey)
        .find({
            order: (sortBy && order) ? { [sortBy]: order } : undefined,
            skip: ROWS_PER_PAGE * page,
            take: ROWS_PER_PAGE
        })
        .then((journeys: Journey[]) => {
            return res.send(journeys);
        })
        .catch((err) => {
            console.error(err);
            return res.sendStatus(400);
        });
};