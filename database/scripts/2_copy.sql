-- Import station data from stations.csv file.
INSERT INTO station (id, name, address, city, operator, capacity, longitude, latitude)
SELECT
    ID, 
    Nimi || ' / ' || Namn || ' / ' || Name,
    Osoite || ' / ' || Adress,
    CASE WHEN Kaupunki IS NOT NULL THEN Kaupunki || ' / ' || Stad ELSE NULL END,
    Operaattor,
    Kapasiteet,
    x,
    y
FROM station_data;

-- Insert id and names of stations that were not included in
-- the station.csv file but are present in journey.csv file.
INSERT INTO station (id, name)
SELECT
    "Departure station id",
    "Departure station name"
FROM journey_data
ON CONFLICT DO NOTHING; -- Ignore if station is already added.

INSERT INTO station (id, name)
SELECT
    "Return station id",
    "Return station name"
FROM journey_data
ON CONFLICT DO NOTHING; -- Ignore if station is already added.

-- Import journey data from journeys.csv file.
INSERT INTO journey (departure_time, return_time, departure_station_id, return_station_id, covered_distance, duration)
SELECT 
    "Departure",
    "Return",
    "Departure station id",
    "Return station id",
    "Covered distance (m)"::numeric::integer,
    "Duration (sec.)"::numeric::integer
FROM journey_data
WHERE "Covered distance (m)" >= 10 AND "Duration (sec.)" >= 10;

-- Delete temporary tables.
DROP TABLE station_data;
DROP TABLE journey_data;
