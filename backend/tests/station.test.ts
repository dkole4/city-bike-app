import "reflect-metadata";

import { assert } from "chai";

import { TestFactory } from "./factory";
import { Station } from "../src/entity/station.entity";

describe('Testing station endpoints', () => {
    const factory: TestFactory = new TestFactory();

    before(async () => {
        await factory.init();
    });

    after(async () => {
        await factory.close();
    });

    describe("GET /stations/0", () => {
        it("Responds with status 200 and a list of stations", (done) => {
            factory.app
                .get("/api/stations/0")
                .set("Accept", "application/json")
                .send()
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const stations: Array<Station> = res.body.data;

                        assert(res.status == 200);
                        assert.isArray(stations, "stations should be an array");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        })
    });

    describe("GET /stations/-1", () => {
        it("Responds with status 400 and an empty list", (done) => {
            factory.app
                .get("/api/stations/-1")
                .set("Accept", "application/json")
                .send()
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        assert(res.status == 400, "response code should be 400");
                        assert(Object.keys(res.body).length === 0, "response body should be empty");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        })
    });
});