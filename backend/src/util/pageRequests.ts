export interface PageRequestParams {
    page: number;
};

export interface PageRequestQueries {
    sortBy: string | undefined;
    order: "DESC" | "ASC" | undefined;
};