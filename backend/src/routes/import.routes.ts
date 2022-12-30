import multer from "multer";
import os from "os";
import { Router } from "express";

import { importJourneyData, importStationData } from "../controllers/import.contoller";

export const router = Router();

// Temporary location of imported CSV files
const filePath: string = os.tmpdir();
const upload: multer.Multer = multer({ dest: filePath });

/**
 * 
 * /import/journey:
 *   post:
 *     summary: Import CSV file containing journey data to the database.
 *     responses:
 *       201:
 *         description: File was successfully imported.
 *       400:
 *         description: File was not found.
 */
router.route("/api/import/journey")
    .post(upload.single("file"), importJourneyData);

/**
 * 
 * /import/station:
 *   post:
 *     summary: Import CSV file containing station data to the database.
 *     responses:
 *       201:
 *         description: File was successfully imported.
 *       400:
 *         description: File was not found.
 */
router.route("/api/import/station")
    .post(upload.single("file"), importStationData);