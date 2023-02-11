import "reflect-metadata";

import { assert } from "chai";

import { TestFactory } from "./factory";
import { JourneyView } from "../src/entity/journeyView.entity";

describe('Testing journey endpoints', () => {
    const factory: TestFactory = new TestFactory();

    before(async () => {
        await factory.init();
    });

    after(async () => {
        await factory.close();
    });

    describe("POST /journey", () => {
        const testStation = {
            id: 1,
            name: "name",
            address: "address",
            city: "Helsinki",
            operator: "operator",
            capacity: 12,
            latitude: 12.000,
            longitude: 24.000
        };

        const testJourney = {
            departure_time: "2021-05-31T23:57:25.000Z",
            return_time: "2021-06-01T00:05:46.000Z",
            departure_station_id: 1,
            return_station_id: 1,
            covered_distance: 2043,
            duration: 500
        };

        it("Responds with status 201 and the saved journey", (done) => {
            // Save a station to mention in the journey test data.
            factory.app
                .post("/api/station")
                .set("Accept", "application/json")
                .send(testStation)
                .end(() => { });

            factory.app
                .post("/api/journey")
                .set("Accept", "application/json")
                .send(testJourney)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const savedJourney: JourneyView = res.body;

                        assert(res.status === 201, "response status code should be 201");
                        assert(savedJourney.departure_station_id === testJourney.departure_station_id,
                            "departure station id of saved journey should be the same as in the request body");
                        assert(savedJourney.return_station_id === testJourney.return_station_id,
                            "return station id of saved journey should be the same as in the request body");
                        console.log(savedJourney.departure_time.toString());
                        console.log(testJourney.departure_time);

                        assert(savedJourney.departure_time.toString() == testJourney.departure_time,
                            "departure time of saved journey should be the same as in the request body");
                        assert(savedJourney.return_time.toString() == testJourney.return_time,
                            "return time of saved journey should be the same as in the request body");
                        assert(savedJourney.covered_distance === testJourney.covered_distance,
                            "covered distance of saved journey should be the same as in the request body");
                        assert(savedJourney.duration === testJourney.duration,
                            "duration of saved journey should be the same as in the request body");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        });

        it("Sending the same journey again results in an error", (done) => {
            factory.app
                .post("/api/journey")
                .set("Accept", "application/json")
                .send(testJourney)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        assert(res.status === 400, "response status code should be 400");
                        assert.isEmpty(res.body, "response body should be empty");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        });
    });

    describe("GET /journeys/0", () => {
        it("Responds with status 200 and a list of journeys", (done) => {
            factory.app
                .get("/api/journeys/0")
                .set("Accept", "application/json")
                .send()
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const journeys: Array<JourneyView> = res.body.data;

                        assert(res.status === 200, "response status code should be 200");
                        assert.isArray(journeys, "journeys should be an array");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        })
    });

    describe("GET /journeys/-1", () => {
        it("Responds with status 400 and an empty list", (done) => {
            factory.app
                .get("/api/journeys/-1")
                .set("Accept", "application/json")
                .send()
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        assert(res.status === 400, "response status code should be 400");
                        assert(Object.keys(res.body).length === 0, "response body should be empty");

                        return done();
                    } catch (e) {
                        return done(e);
                    }
                })
        })
    });
});