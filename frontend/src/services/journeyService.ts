import axios from "axios";

import { Order } from "../util/filter";
import { JourneyResponse } from "../entities/journey.entity";

// Backend URL
const { REACT_APP_BACKEND } = process.env;
const journeysUrl: string = `http://${REACT_APP_BACKEND}/journeys`;

const journeyService = {
    /**
     * Get the list of journeys from a page.
     * @param page the number of page to fetch data from.
     * @param sortBy the column to sort the results by. Undefined by default.
     * @param order the order to use in sorting. Undefined by default.
     * @returns {Promise<JourneyResponse>} response object containing the list
     * of journeys and number of pages if fetching was successful,
     * empty list otherwise.
     */
    getJourneys: async (
        page: number,
        sortBy: string | undefined = undefined,
        order: Order = undefined
    ): Promise<JourneyResponse> => {
        try {
            const url: string = `${journeysUrl}/${page}`
                + (sortBy ? `?sortBy=${sortBy}` : ``)
                + (order ? `&order=${order}` : ``);
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return { pages: 0, data: [] };
        }
    }
};

export default journeyService;