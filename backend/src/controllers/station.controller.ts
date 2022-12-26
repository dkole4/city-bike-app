import "reflect-metadata";
import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station";
import { ROWS_PER_PAGE } from "../constants";
import { StationView } from "../entity/stationView";

export const fetchStationPage = async (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page as string);

    const stations = await AppDataSource
        .getRepository(Station)
        .createQueryBuilder("station")
        .skip(ROWS_PER_PAGE * page)
        .take(ROWS_PER_PAGE)
        .getMany();

    return res.send(stations);
}

export const fetchStation = async (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId as string);

    const station = await AppDataSource
        .getRepository(Station)
        .findOneBy({ id: stationId });

    return res.send(station);
}

export const fetchStationDetailed = async (req: Request, res: Response) => {
    const stationId: number = parseInt(req.params.stationId as string);

    const station = await AppDataSource
        .manager
        .findOneBy(StationView, { id: stationId });

    return res.send(station);
}