import axios from "axios";

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
    getJourneys: async (page: number): Promise<Journey[]> => {
        try {
            const response = await axios.get(`${journeysUrl}/${page}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
};

export default journeyService;