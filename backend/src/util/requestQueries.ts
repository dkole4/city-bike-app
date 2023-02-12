
/**
 * Query interface for endpoints that serve pages.
 * 
 * @interface PageRequestQueries
 * @member {string | undefined} sortBy Column to sort results by.
 * @member {"DESC" | "ASC" | undefined} order Order to use in sorting.
 */
interface PageRequestQueries {
    sortBy?: string;
    order?: "DESC" | "ASC";
};

/**
 * Extension of PageRequestQueries that includes queries
 * needed by the station endpoints.
 * 
 * @interface StationRequestQueries
 * @member {string | undefined} name Name of the station to search for.
 * @member {string | undefined} address Address of the station to search for.
 */
export interface StationRequestQueries extends PageRequestQueries {
    name?: string;
    address?: string;
};

/**
 * Extension of PageRequestQueries that includes queries
 * needed by the journey endpoints.
 * 
 * @interface JourneyRequestQueries
 * @member {string | undefined} stationName Name of the station that is
 * departure station and/or return station of the journey.
 */
export interface JourneyRequestQueries extends PageRequestQueries {
    stationName?: string;
};