import "reflect-metadata";

// Set env variables from .env file
import { config } from 'dotenv';
config();

import { DataSource } from 'typeorm';
import { createServer, Server as HttpServer } from 'http';

import express from 'express';
import supertest from 'supertest';

import { router as stationRouter } from "../src/routes/station.routes";
import { router as journeyRouter } from "../src/routes/journey.routes";
import { router as importRouter } from "../src/routes/import.routes";
import { AppDataSource } from "../src/data-source";

/**
 * Factory that emulates the app for testing purposes.
 */
export class TestFactory {
    private _app: express.Application;
    private _dataSource: DataSource;
    private _server: HttpServer;

    public get app(): supertest.SuperTest<supertest.Test> {
        return supertest(this._app);
    }

    public get dataSource(): DataSource {
        return this._dataSource;
    }

    public get server(): HttpServer {
        return this._server;
    }

    /**
     * Connect to the database, set up and start the app.
     */
    public async init(): Promise<void> {
        this._app = express();
        this._app.use(express.json());

        this._app.use(stationRouter);
        this._app.use(journeyRouter);
        this._app.use(importRouter);

        await AppDataSource.initialize();

        this._server = createServer(this._app)
            .listen(process.env.NODE_PORT);
    }

    /**
     * Close the server and destroy the DataSource.
     */
    public async close(): Promise<void> {
        this._server.close();
        await AppDataSource.destroy();
    }
}
