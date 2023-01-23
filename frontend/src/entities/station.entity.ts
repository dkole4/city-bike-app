/**
 * Station data extended with average departure and return distances.
 * 
 * @interface StationView
 */
export interface StationView {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    departure_count: number;
    average_departure_distance: number;
    return_count: number;
    average_return_distance: number;
}

/**
 * Basic station data.
 * 
 * @interface Station
 */
export interface Station {
    id: number;
    name: string;
    address: string;
    city: string;
    operator: string;
    capacity: number;
    longitude: number;
    latitude: number;
}

/**
 * Represents the response containing a page of Stations.
 * 
 * @interface StationResponse
 */
export interface StationResponse {
    pages: number;
    data: Station[];
}

/**
 * Represents the response containing a page of StationViews.
 * 
 * @interface StationViewResponse
 */
export interface StationViewResponse {
    pages: number;
    data: StationView[];
}