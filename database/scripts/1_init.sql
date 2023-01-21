CREATE TABLE IF NOT EXISTS station (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  operator TEXT,
  capacity INTEGER,
  longitude REAL,
  latitude REAL
);

CREATE TABLE IF NOT EXISTS journey (
  id BIGSERIAL PRIMARY KEY,
  departure_time TIMESTAMP NOT NULL,
  return_time TIMESTAMP NOT NULL,
  departure_station_id BIGSERIAL NOT NULL,
  return_station_id BIGSERIAL NOT NULL,
  covered_distance INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  FOREIGN KEY(departure_station_id) REFERENCES station(id),
  FOREIGN KEY(return_station_id) REFERENCES station(id)
);

-- Create views manually to avoid data loss in production in case TypeORM
-- decides to recreate the database schema automatically because of its
-- synchronize option. 
CREATE VIEW station_view AS
  SELECT "station"."id" AS "id", 
          "station"."name" AS "name",
          "station"."address" AS "address",
          "station"."longitude" AS "longitude",
          "station"."latitude" AS "latitude",
          COALESCE("departures"."departure_count", 0) AS "departure_count",
          COALESCE("departures"."distance" / "departures"."departure_count", 0)
              AS "average_departure_distance",
          COALESCE("returns"."return_count", 0) AS "return_count",
          COALESCE("returns"."distance" / "returns"."return_count", 0)
              AS "average_return_distance"
  FROM "station" "station"
  LEFT JOIN (
      SELECT "journey"."departure_station_id", 
              COUNT("journey"."departure_station_id") AS "departure_count",
              SUM("journey"."covered_distance") AS "distance"
      FROM "journey" "journey"
      GROUP BY "journey"."departure_station_id"
  ) AS "departures" ON "station"."id" = "departures"."departure_station_id"
  LEFT JOIN (
      SELECT "journey"."return_station_id", 
              COUNT("journey"."return_station_id") AS "return_count",
              SUM("journey"."covered_distance") AS "distance"
      FROM "journey" "journey"
      GROUP BY "journey"."return_station_id"
  ) AS "returns" ON "station"."id" = "returns"."return_station_id";

CREATE VIEW journey_view AS
  SELECT "journey"."departure_time" AS "departure_time",
          "journey"."return_time" AS "return_time",
          "journey"."departure_station_id" AS "departure_station_id",
          "journey"."return_station_id" AS "return_station_id",
          "journey"."covered_distance" AS "covered_distance",
          "journey"."duration" AS "duration",
          "departure_station"."name" AS "departure_station_name",
          "return_station"."name" AS "return_station_name"
  FROM "journey" "journey"
  LEFT JOIN "station" "departure_station"
      ON "departure_station"."id" = "journey"."departure_station_id"
  LEFT JOIN "station" "return_station" 
      ON "return_station"."id" = "journey"."return_station_id";
