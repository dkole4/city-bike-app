import axios from "axios";

const { REACT_APP_BACKEND} = process.env;

const stationsUrl: string = `http://${REACT_APP_BACKEND}/stations`;
const singleStationUrl: string = `http://${REACT_APP_BACKEND}/station`;


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
    getStations: async (page: number): Promise<Station[]> => {
        try {
            const response = await axios.get(`${stationsUrl}/${page}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    getStation: async (stationId: number): Promise<StationView | null> => {
        try {
            const response = await axios.get(`${singleStationUrl}/${stationId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};

export default stationService;