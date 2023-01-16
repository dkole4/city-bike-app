import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

import JourneyService, { Journey } from "../services/journeyService";
import PageNavigation from "./pageNavigation";


const JourneyList: React.FC<{}> = () => {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const navigate: NavigateFunction = useNavigate();

    const params: Readonly<Params<string>> = useParams();
    const page: number = params.page ? parseInt(params.page) : 0;

    useEffect(() => {
        // Navigate to the first page if negative page number was passed,
        // fetch journey data otherwise.
        if (page < 0) {
            navigate("/journeys/0");
            console.log(page);
        }
        else {
            JourneyService
                .getJourneys(page)
                .then((values: Journey[]) => setJourneys(values));
        }
    }, [page, navigate]);

    return (
        <Container>
            <Header className="Journey-list">
                Journey list, page: {page}
            </Header>
            <PageNavigation listType="journeys" page={page} />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Departure Station ID</Table.HeaderCell>
                        <Table.HeaderCell>Return Station ID</Table.HeaderCell>
                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                        <Table.HeaderCell>Return Time</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Distance</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {journeys.map((journey, index) =>
                        <Table.Row key={index}>
                            <Table.Cell>
                                <Link to={`/station/${journey.departure_station_id}`}>
                                    {journey.departure_station_id}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/station/${journey.return_station_id}`}>
                                    {journey.return_station_id}
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