import axios from "axios";
import { Order } from "../util/filter";

// Backend URLs
const { REACT_APP_BACKEND } = process.env;
const stationsUrl: string = `http://${REACT_APP_BACKEND}/stations`;
const singleStationUrl: string = `http://${REACT_APP_BACKEND}/station`;

/**
 * Station data extended with average departure and return distances.
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

const stationService = {
    /**
     * Get the list of stations from a page.
     * @param page the number of page to fetch data from.
     * @param sortBy the column to sort the results by. Undefined by default.
     * @param order the order to use in sorting. Undefined by default.
     * @returns {Promise<Station[]>} the list of stations if fetching
     * was successful, empty list otherwise.
     */
    getStations: async (
        page: number,
        sortBy: string | undefined = undefined,
        order: Order = undefined
    ): Promise<Station[]> => {
        try {
            const url: string = `${stationsUrl}/${page}`
                + (sortBy ? `?sortBy=${sortBy}` : ``)
                + (order ? `&order=${order}` : ``);
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    /**
     * Get extended station data.
     * @param stationId the id of station.
     * @returns {Promise<StationView | undefined>} extended station data if
     * fetching was successful, undefined otherwise.
     */
    getStation: async (stationId: number): Promise<StationView | undefined> => {
        try {
            const response = await axios.get(`${singleStationUrl}/${stationId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
};

export default stationService;