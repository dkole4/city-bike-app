import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { ROWS_PER_PAGE } from "../constants";
import { Journey } from "../entity/journey";

/**
 * Fetch a page of journeys.
 */
export const fetchJourneyPage = (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page);

    AppDataSource
        .getRepository(Journey)
        .createQueryBuilder("journey")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany()
        .then((journeys: Journey[]) => {
            return res.send(journeys);
        })
        .catch((err) => console.error(err));
};