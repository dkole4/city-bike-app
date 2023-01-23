export interface PageRequestParams {
    page: number;
};

export interface StationRequestQueries extends PageRequestQueries {
    name?: string;
    address?: string;
};

export interface JourneyRequestQueries extends PageRequestQueries {
    stationName?: string;
};

interface PageRequestQueries {
    sortBy?: string;
    order?: "DESC" | "ASC";
};