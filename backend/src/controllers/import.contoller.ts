import "reflect-metadata";
import { Request, RequestHandler, Response } from "express";
import fs from "fs";
import { parse, Parser } from "csv-parse";

import { AppDataSource } from "../data-source";
import { Station } from "../entity/station.entity";
import { Journey } from "../entity/journey.entity";
import { JOURNEY_CSV_HEADER, STATION_CSV_HEADER, __test__ } from "../constants";
import { Repository } from "typeorm";


/**
 * CSV row that contains information about a journey.
 * 
 * @interface JourneyCSVRow
 */
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

/**
 * CSV row that contains information about a station.
 * 
 * @interface StationCSVRow
 */
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

/**
 * Check whether given journey data is valid.
 * @param {JourneyCSVRow} data CSV row containing journey data.
 * @returns true if data is valid, false otherwise.
 */
const isValidJourneyRow = (data: JourneyCSVRow) => {
    return data.distance >= 10 && data.duration >= 10;
}

/**
 * Convert distance and duration data of JourneyCSVRow to integers.
 * @param {JourneyCSVRow} data CSV row containing journey data.
 */
const truncateJourneyRowNumbers = (data: JourneyCSVRow) => {
    data.distance = Math.trunc(data.distance);
    data.duration = Math.trunc(data.duration);
}

/**
 * Save a CSV row containing journey data into the database.
 * @param {JourneyCSVRow} data CSV row containing journey data.
 */
const saveJourneyRow = async (data: JourneyCSVRow): Promise<void> => {
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
    const stationRepository: Repository<Station>
        = AppDataSource.getRepository(Station);

    // If journey wasn't started and ended at the same station,
    // upsert both of them, and only one of them otherwise.
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

    // Insert journey data into the database.
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

/**
 * Import CSV rows containing journey data into the database.
 */
export const importJourneyData = (): RequestHandler => {
    return async (req: Request, res: Response) => {
        const file: Express.Multer.File | undefined = req.file;

        // Send 400 status if CSV file not found.
        if (!file) {
            return res.sendStatus(400);
        }

        const lineReader: Parser = fs.createReadStream(file.path)
            .pipe(
                parse({
                    columns: JOURNEY_CSV_HEADER,
                })
            );

        for await (const record of lineReader) {
            await saveJourneyRow(record);

            // Show import progress if app is started in test mode.
            if (__test__)
                console.log("Progress: ", lineReader.info.bytes / file.size * 100, "%");
        }

        // Send 201 status if data was successfully saved.
        return res.sendStatus(201);
    };
};

/**
 * Save a CSV row contating station data to the database.
 * @param {StationCSVRow} data CSV row containing station data.
 */
const saveStationRow = async (data: StationCSVRow) => {
    const stationRepository: Repository<Station>
        = AppDataSource.getRepository(Station);

    // Create a Station instance from received data.
    const station: Station = stationRepository.create({
        id: data.id,
        name: `${data.nimi} / ${data.namn} / ${data.name}`,
        address:
            // Save address in all languages if it's available in finnish,
            // leave blank otherwise.
            (data.osoite
                ? `${data.osoite} / ${data.adress}`
                : ``),
        city:
            // Save city name in all languages if it's available in finnish,
            // leave blank otherwise.
            (data.kaupunki
                ? `${data.kaupunki} / ${data.stad}`
                : ``),
        operator: data.operator,
        capacity: data.capacity,
        longitude: data.longitude,
        latitude: data.latitude
    });

    // Upsert created Station instance.
    await stationRepository.upsert(station, ["id"]);
}

/**
 * Save station data to the database.
 */
export const importStationData = (): RequestHandler => {
    return async (req: Request, res: Response) => {
        const file: Express.Multer.File | undefined = req.file;

        // Send 400 status if CSV file not found.
        if (!file) {
            return res.sendStatus(400);
        }

        const lineReader: Parser = fs.createReadStream(file.path)
            .pipe(
                parse({
                    columns: STATION_CSV_HEADER,
                })
            );

        for await (const record of lineReader) {
            await saveStationRow(record);

            // Show import progress if app is started in development mode.
            if (__test__)
                console.log("Progress: ", lineReader.info.bytes / file.size * 100, "%");
        }

        // Send 201 status if data was successfully saved.
        return res.sendStatus(201);
    };
};