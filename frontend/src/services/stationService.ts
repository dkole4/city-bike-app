import axios from "axios";

import { StationResponse, StationView } from "../entities/station.entity";
import { Order } from "../util/filter";

// Backend URLs
const { REACT_APP_BACKEND } = process.env;
const stationsUrl: string = `http://${REACT_APP_BACKEND}/stations`;
const singleStationUrl: string = `http://${REACT_APP_BACKEND}/station`;

const stationService = {
    /**
     * Get the list of stations from a page.
     * @param page the number of page to fetch data from.
     * @param sortBy the column to sort the results by. Undefined by default.
     * @param order the order to use in sorting. Undefined by default.
     * @returns {Promise<StationResponse>} response object containing the list
     * of stations and number of pages if fetching was successful,
     * empty list otherwise.
     */
    getStations: async (
        page: number,
        sortBy: string | undefined = undefined,
        order: Order = undefined
    ): Promise<StationResponse> => {
        try {
            const url: string = `${stationsUrl}/${page}`
                + (sortBy ? `?sortBy=${sortBy}` : ``)
                + (order ? `&order=${order}` : ``);
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return { pages: 0, data: [] };
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