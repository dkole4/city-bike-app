import "reflect-metadata";

import { assert } from "chai";

import { TestFactory } from "./factory";
import { Station } from "../src/entity/station.entity";
import { StationView } from "../src/entity/stationView.entity";

describe('Testing station endpoints', () => {
    const factory: TestFactory = new TestFactory();

    before(async () => {
        await factory.init();
    });

    after(async () => {
        await factory.close();
    });

    describe("POST /station", () => {
        const testStation = {
            id: 0,
            name: "name",
            address: "address",
            city: "Helsinki",
            operator: "operator",
            capacity: 12,
            latitude: 12.000,
            longitude: 24.000
        };

        it("Responds with status 201 and the saved station", (done) => {
            factory.app
                .post("/api/station")
                .set("Accept", "application/json")
                .send(testStation)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const savedStation: Station = res.body;

                        assert(res.status == 201, "response status code should be 201");
                        assert(savedStation.id == testStation.id, "id of saved station should be the same as in the request body");
                        assert(savedStation.name == testStation.name, "name of saved station should be the same as in the request body");
                        assert(savedStation.address == testStation.address, "address of saved station should be the same as in the request body");
                        assert(savedStation.city == testStation.city, "city of saved station should be the same as in the request body");
                        assert(savedStation.operator == testStation.operator, "operator of saved station should be the same as in the request body");
                        assert(savedStation.capacity == testStation.capacity, "capacity of saved station should be the same as in the request body");
                        assert(savedStation.latitude == testStation.latitude, "latitude of saved station should be the same as in the request body");
                        assert(savedStation.longitude == testStation.longitude, "longitude of saved station should be the same as in the request body");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        });

        it("Saved station data can be fetched from the app", (done) => {
            factory.app
                .get("/api/station/0")
                .set("Accept", "application/json")
                .send()
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const station: StationView = res.body;

                        assert(res.status == 200, "response status code should be 200");
                        assert(station.id == testStation.id, "id of saved station should be the same as in the request body");
                        assert(station.name == testStation.name, "name of saved station should be the same as in the request body");
                        assert(station.address == testStation.address, "address of saved station should be the same as in the request body");

                        // City, operator and capacity are not included in the StationView.
                        // assert(station.city == testStation.city, "city of saved station should be the same as in the request body");
                        // assert(station.operator == testStation.operator, "operator of saved station should be the same as in the request body");
                        // assert(station.capacity == testStation.capacity, "capacity of saved station should be the same as in the request body");
                        
                        assert(station.latitude == testStation.latitude, "latitude of saved station should be the same as in the request body");
                        assert(station.longitude == testStation.longitude, "longitude of saved station should be the same as in the request body");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        });

        it("Sending the same station again results in an error", (done) => {
            factory.app
                .post("/api/station")
                .set("Accept", "application/json")
                .send(testStation)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        assert(res.status == 400, "response status code should be 400");
                        assert.isEmpty(res.body, "response body should be empty");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        });
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

                        assert(res.status == 200, "response status code should be 200");
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

                        assert(res.status == 400, "response status code should be 400");
                        assert(Object.keys(res.body).length === 0, "response body should be empty");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        })
    });
});