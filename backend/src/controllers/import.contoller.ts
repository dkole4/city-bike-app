import "reflect-metadata";
import { Request, Response } from "express";
import fs from "fs";
import { parse, Parser } from "csv-parse";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station";
import { Journey } from "../entity/journey";
import { JOURNEY_CSV_HEADER, STATION_CSV_HEADER } from "../constants";

interface JourneyCSVRow {
    departure_time: string,
    return_time: string,
    departure_id: number,
    departure_name: string,
    return_id: number,
    return_name: string,
    distance: number,
    duration: number
};

interface StationCSVRow {
    fid: number,
    id: number,
    nimi: string,
    namn: string,
    name: string,
    osoite: string,
    adress: string,
    kaupunki: string,
    stad: string,
    operator: string,
    capacity: number,
    longitude: number,
    latitude: number
};

const isValidJourneyRow = (data: JourneyCSVRow) => {
    return data.distance >= 10 && data.duration >= 10;
}

const truncateJourneyRowNumbers = (data: JourneyCSVRow) => {
    data.distance = Math.trunc(data.distance);
    data.duration = Math.trunc(data.duration);
}

const saveJourneyRow = async (data: JourneyCSVRow) => {
    // Not saving journey if its distance is less than 10 meters
    // or duration is less than 10 seconds.
    if (!isValidJourneyRow(data)) return;

    // Convert distance and duration to integers if
    // given as floating point numbers.
    truncateJourneyRowNumbers(data);

    // Save stations if they weren't saved yet, ignore otherwise.
    // Ignoring errors on duplicates reduces number of transactions needed
    // to process a journey compared to counting stations with
    // the same id before saving.
    const stationRepository = AppDataSource.getRepository(Station);

    // await AppDataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Station)
    //     .values({
    //         id: data.departure_id,
    //         name: data.departure_name
    //     })
    //     .orIgnore()
    //     .execute();

    // await AppDataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Station)
    //     .values({
    //         id: data.return_id,
    //         name: data.return_name
    //     })
    //     .orIgnore()
    //     .execute();

    if (data.departure_id != data.return_id) {
        await stationRepository.upsert([
            { id: data.return_id, name: data.return_name },
            { id: data.departure_id, name: data.departure_name }
        ], ["id"]);
    } else {
        await stationRepository.upsert(
            { id: data.return_id, name: data.return_name }, ["id"]
        );
    }

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Journey)
        .values({
            departure_station_id: data.departure_id,
            return_station_id: data.return_id,
            departure_time: data.departure_time,
            return_time: data.return_time,
            covered_distance: data.distance,
            duration: data.duration
        })
        .orIgnore()
        .execute();
}

export const importJourneyData = async (req: Request, res: Response) => {
    const file: Express.Multer.File | undefined = req.file;

    if (!file) {
        return res.sendStatus(401);
    }

    const fileSize: number = file.size;
    const lineReader: Parser = fs.createReadStream(file.path)
        .pipe(
            parse({
                columns: JOURNEY_CSV_HEADER,
                from_line: 1                 // Ignoring the header line
            })
        );

    for await (const record of lineReader) {
        await saveJourneyRow(record);
        console.log("Progress: ", lineReader.info.bytes / fileSize * 100, "%");
    }

    return res.sendStatus(301);
}


const saveStationRow = async (data: StationCSVRow) => {
    // Save stations if they weren't saved yet, ignore otherwise.
    // Ignoring errors on duplicates reduces number of transactions needed
    // to process a journey compared to counting stations with
    // the same id before saving.
    const stationRepository = AppDataSource.getRepository(Station);

    const station = stationRepository.create({
        id: data.id,
        name: `${data.nimi} / ${data.namn} / ${data.name}`,
        address: (data.osoite ? `${data.osoite} / ${data.adress}` : ``),
        city: (data.kaupunki ? `${data.kaupunki} / ${data.stad}` : ``),
        operator: data.operator,
        capacity: data.capacity,
        longitude: data.longitude,
        latitude: data.latitude
    });

    await stationRepository.upsert(station, ["id"]);

    // await AppDataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Station)
    //     .values(station)
    //     .orIgnore()
    //     .execute();
}

export const importStationData = async (req: Request, res: Response) => {
    const file: Express.Multer.File | undefined = req.file;

    if (!file) {
        return res.sendStatus(401);
    }

    const fileSize: number = file.size;
    const lineReader: Parser = fs.createReadStream(file.path)
        .pipe(
            parse({
                columns: STATION_CSV_HEADER,
                from_line: 2                 // Ignoring the header line
            })
        );

    for await (const record of lineReader) {
        await saveStationRow(record);
        console.log("Progress: ", lineReader.info.bytes / fileSize * 100, "%");
    }

    return res.sendStatus(301);
}