import { Router } from "express";

import { fetchStationView, fetchStationPage } from "../controllers/station.controller";

export const router = Router();

/**
 * 
 * /station/{stationId}:
 *   get:
 *     summary: Fetch a single station.
 *     description: Fetch detailed info about a station. 
 *     responses:
 *       200:
 *         description: A single station.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Station ID.
 *                   example: 0
 *                 name:
 *                   type: string
 *                   description: Station name.
 *                   example: Teljäntie
 *                 address:
 *                   type: string
 *                   description: Station address.
 *                   example: Ulvilantie 21 / Ulfsbyvägen 21
 *                 longitude:
 *                   type: number
 *                   description: Station longitude.
 *                   example: 24.868656
 *                 latitude:
 *                   type: number
 *                   description: Station latitude.
 *                   example: 60.20969
 *                 departure_count:
 *                   type: number
 *                   description: Number of journeys starting from station.
 *                   example: 1348
 *                 average_departure_distance:
 *                   type: number
 *                   description: Average distance of a journey starting from station.
 *                   example: 2854
 *                 return_count:
 *                   type: number
 *                   description: Number of journeys ending at station.
 *                   example: 1349
 *                 average_return_count:
 *                   type: number
 *                   description: Average distance of a journey ending at station.
 *                   example: 2874
 *       404:
 *         description: Station not found.
 */
router.route("/api/station/:stationId")
    .get(fetchStationView);

/**
 * 
 * /stations/{page}:
 *   get:
 *     summary: Fetch a page from list of stations.
 *     description: Fetch a page of stations using the number of page.
 *     responses:
 *       200:
 *         description: A list of stations from requested page.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Station ID.
 *                     example: 0
 *                   name:
 *                     type: string
 *                     description: Station name.
 *                     example: Teljäntie
 *                   address:
 *                     type: string
 *                     description: Station address.
 *                     example: Ulvilantie 21 / Ulfsbyvägen 21
 *                   longitude:
 *                     type: number
 *                     description: Station longitude.
 *                     example: 24.868656
 *                   latitude:
 *                     type: number
 *                     description: Station latitude.
 *                     example: 60.20969
 *                   departure_count:
 *                     type: number
 *                     description: Number of journeys starting from station.
 *                     example: 1348
 *                   average_departure_distance:
 *                     type: number
 *                     description: Average distance of a journey starting from station.
 *                     example: 2854
 *                   return_count:
 *                     type: number
 *                     description: Number of journeys ending at station.
 *                     example: 1349
 *                   average_return_count:
 *                     type: number
 *                     description: Average distance of a journey ending at station.
 *                     example: 2874
 */
router.route("/api/stations/:page")
    .get(fetchStationPage);
