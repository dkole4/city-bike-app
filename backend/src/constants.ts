export const __prod__ = process.env.NODE_ENV === "production";

// The number of database rows to use in pagination.
export const ROWS_PER_PAGE: number = 20;

// Expected header of a CSV file containing journey data.
export const JOURNEY_CSV_HEADER: Array<string> = [
    "departure_time",
    "return_time",
    "departure_id",
    "departure_name",
    "return_id",
    "return_name",
    "distance",
    "duration"
];

// Expected header of a CSV file containing station data.
export const STATION_CSV_HEADER: Array<string> = [
    "fid",
    "id",
    "nimi",
    "namn",
    "name",
    "osoite",
    "adress",
    "kaupunki",
    "stad",
    "operator",
    "capacity",
    "longitude",
    "latitude"
];