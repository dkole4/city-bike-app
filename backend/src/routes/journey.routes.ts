import { Router } from "express";

import { fetchJourneyPage } from "../controllers/journey.controller";

export const router = Router();

/**
 * 
 * /journeys/{page}:
 *   get:
 *     summary: Fetch a page from list of journeys.
 *     description: Fetch a page of journeys using the number of page.
 *     responses:
 *       200:
 *         description: A list of journeys from requested page.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   departure_time:
 *                     type: string
 *                     description: Timestamp of departure time.
 *                     example: 2021-05-31T23:33:29.000Z
 *                   return_time:
 *                     type: string
 *                     description: Timestamp of return time.
 *                     example: 2021-05-31T23:54:13.000Z
 *                   departure_station_id:
 *                     type: number
 *                     description: The id of the station journey starts from.
 *                     example: 547
 *                   return_station_id:
 *                     type: number
 *                     description: The id of the station journey ends at.
 *                     example: 547
 *                   covered_distance:
 *                     type: number
 *                     description: Distance covered during journey in meters.
 *                     example: 1872
 *                   duration:
 *                     type: number
 *                     description: Duration of journey in seconds.
 *                     example: 1239
 */
router.route("/api/journeys/:page")
    .get(fetchJourneyPage);