CREATE TABLE IF NOT EXISTS station_data (
    FID INTEGER,
    ID INTEGER,
    Nimi TEXT,
    Namn TEXT,
    Name TEXT,
    Osoite TEXT,
    Adress TEXT,
    Kaupunki TEXT,
    Stad TEXT,
    Operaattor TEXT,
    Kapasiteet INTEGER,
    x REAL,
    y REAL
);

CREATE TABLE IF NOT EXISTS journey_data (
    "Departure" TIMESTAMP,
    "Return" TIMESTAMP,
    "Departure station id" INTEGER,
    "Departure station name" TEXT,
    "Return station id" INTEGER,
    "Return station name" TEXT,
    "Covered distance (m)" REAL,
    "Duration (sec.)" REAL
);

COPY station_data FROM '/stations.csv' DELIMITER ',' CSV HEADER;
COPY journey_data FROM '/journeys.csv' DELIMITER ',' CSV HEADER;
