/**
 * Represents the JourneyView entity.
 * 
 * @interface Journey
 */
export interface Journey {
    departure_time: Date;
    return_time: Date;
    departure_station_id: number;
    return_station_id: number;
    covered_distance: number;
    duration: number;
    departure_station_name: string;
    return_station_name: string;
};