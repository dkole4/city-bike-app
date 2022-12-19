DO $$
DECLARE
station_id1 INTEGER;
station_id2 INTEGER;

BEGIN
INSERT INTO station(id, name) VALUES (082, 'Töölöntulli');
SELECT id INTO station_id1 FROM station WHERE name='Töölöntulli';

INSERT INTO station(id, name) VALUES (113, 'Pasilan asema');
SELECT id INTO station_id2 FROM station WHERE name='Pasilan asema';

INSERT INTO journey(departure_station_id, return_station_id, covered_distance, duration)
    VALUES (082, 113, 1890, 611);
END $$;
