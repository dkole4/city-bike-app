import axios from "axios";
import { Order } from "../util/filter";

// Backend URL
const { REACT_APP_BACKEND } = process.env;
const journeysUrl: string = `http://${REACT_APP_BACKEND}/journeys`;

export interface Journey {
    departure_time: Date;
    return_time: Date;
    departure_station_id: number;
    return_station_id: number;
    covered_distance: number;
    duration: number;
};

const journeyService = {
    /**
     * Get the list of journeys from a page.
     * @param page the number of page to fetch data from.
     * @param sortBy the column to sort the results by. Undefined by default.
     * @param order the order to use in sorting. Undefined by default.
     * @returns {Promise<Journey[]>} the list of journeys if fetching
     * was successful, empty list otherwise.
     */
    getJourneys: async (
        page: number,
        sortBy: string | undefined = undefined,
        order: Order = undefined
    ): Promise<Journey[]> => {
        try {
            const url: string = `${journeysUrl}/${page}`
                + (sortBy ? `?sortBy=${sortBy}` : ``)
                + (order ? `&order=${order}` : ``);
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
};

export default journeyService;