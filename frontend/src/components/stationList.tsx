import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

import { StationResponse } from "../entities/station.entity";
import StationService from "../services/stationService";
import { Filter, getNextOrder } from "../util/filter";
import PageNavigation from "./pageNavigation";
import SortableColumns from "./sortableColumns";


const StationList: React.FC<{}> = () => {
    const params: Readonly<Params<string>> = useParams();
    const navigate: NavigateFunction = useNavigate();

    const [response, setResponse] = useState<StationResponse>({
        pages: 0,
        data: []
    });
    // Filter of the list to use in journey data fetching.
    const [filter, setFilter] = useState<Filter>({
        name: undefined,
        order: undefined
    });
    const page = params.page ? parseInt(params.page) : 0;

    useEffect(() => {
        // Navigate to the first page if negative page number was passed,
        // fetch station data otherwise.
        if (page < 0) {
            navigate("/stations/0");
        }
        else {
            StationService
                .getStations(page, filter.name, filter.order)
                .then((value: StationResponse) => setResponse(value));
        }
    }, [page, filter, navigate]);

    /**
     * Change the sorting of the list using the name of a column to sort by.
     * @param name name of the column to sort the list by.
     */
    const updateOrder = (name: string) => {
        const newFilter: Filter = {
            name,
            order: (name === filter.name)
                ? getNextOrder(filter.order)
                : "ASC"
        };
        setFilter(newFilter);
        
        // Navigate to the first page of the list.
        navigate("/stations/0");
    }

    return (
        <Container>
            <Header block className="Station-list">
                Station list, page: {page}
            </Header>
            <PageNavigation listType="stations" page={page} totalPages={response.pages} />
            <Table>
                <SortableColumns
                    names={[
                        "name",
                        "city",
                        "address",
                        "capacity",
                        "operator"
                    ]}
                    updateTableOrder={updateOrder}
                    currentFilter={filter}
                />
                <Table.Body>
                    { /** Creating rows of stations. */ }
                    {response.data.map((station) =>
                        <Table.Row key={station.id}>
                            <Table.Cell>
                                <Link to={`/station/${station.id}`}>
                                    {station.name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{station.city}</Table.Cell>
                            <Table.Cell>{station.address}</Table.Cell>
                            <Table.Cell>{station.capacity}</Table.Cell>
                            <Table.Cell>{station.operator}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default StationList;