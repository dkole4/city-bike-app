CREATE TABLE station (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  UNIQUE(name)
);

CREATE TABLE journey (
  departure_station_id BIGSERIAL NOT NULL,
  return_station_id BIGSERIAL NOT NULL,
  covered_distance INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  PRIMARY KEY(departure_station_id, return_station_id),
  FOREIGN KEY(departure_station_id) REFERENCES station(id),
  FOREIGN KEY(return_station_id) REFERENCES station(id)
);