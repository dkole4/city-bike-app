import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

import { JourneyResponse } from "../entities/journey.entity";
import JourneyService from "../services/journeyService";
import { Filter, getNextOrder } from "../util/filter";
import PageNavigation from "./pageNavigation";
import SortableColumns from "./sortableColumns";


const JourneyList: React.FC<{}> = () => {
    const params: Readonly<Params<string>> = useParams();
    const navigate: NavigateFunction = useNavigate();

    const [response, setResponse] = useState<JourneyResponse>({
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
        // fetch journey data otherwise.
        if (page < 0) {
            navigate("/journeys/0");
        }
        else {
            JourneyService
                .getJourneys(page, filter.name, filter.order)
                .then((value: JourneyResponse) => setResponse(value));
        }
    }, [page, filter, navigate]);

    /**
     * Change the sorting of the list using the name of a column to sort by.
     * @param name name of the column to sort the list by.
     */
    const updateOrder = (name: string): void => {
        const newFilter: Filter = {
            name,
            order: (name === filter.name)
                ? getNextOrder(filter.order)
                : "ASC"
        };
        setFilter(newFilter);
        
        // Navigate to the first page of the list.
        navigate("/journeys/0");
    }

    return (
        <Container>
            <Header block className="Journey-list">
                Journey list, page: {page}
            </Header>
            <PageNavigation
                listType="journeys"
                page={page}
                totalPages={response.pages} 
            />
            <Table>
                <SortableColumns
                    names={[
                        "departure_station_id",
                        "return_station_id",
                        "departure_time",
                        "return_time",
                        "duration",
                        "covered_distance"
                    ]}
                    updateTableOrder={updateOrder}
                    currentFilter={filter}
                />
                <Table.Body>
                    { /** Creating rows of journeys. */ }
                    {response.data.map((journey, index) =>
                        <Table.Row key={index}>
                            <Table.Cell>
                                <Link to={`/station/${journey.departure_station_id}`}>
                                    {journey.departure_station_name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/station/${journey.return_station_id}`}>
                                    {journey.return_station_name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{journey.departure_time.toString()}</Table.Cell>
                            <Table.Cell>{journey.return_time.toString()}</Table.Cell>
                            <Table.Cell>{journey.duration}</Table.Cell>
                            <Table.Cell>{journey.covered_distance}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default JourneyList;