import React, { useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

import StationService, { Station } from "../services/stationService";
import PageNavigation from "./pageNavigation";


const StationList: React.FC<{}> = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const navigate: NavigateFunction = useNavigate();

    const params: Readonly<Params<string>> = useParams();
    const page: number = params.page ? parseInt(params.page) : 0;

    useEffect(() => {
        // Navigate to the first page if negative page number was passed,
        // fetch station data otherwise.
        if (page < 0) {
            navigate("/stations/0");
            console.log(page);
        }
        else {
            StationService
                .getStations(page)
                .then((values: Station[]) => setStations(values));
        }
    }, [page, navigate]);

    return (
        <Container>
            <Header className="Station-list">
                Station list, page: {page}
            </Header>
            <PageNavigation listType="stations" page={page} />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Capacity</Table.HeaderCell>
                        <Table.HeaderCell>Operator</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {stations.map((station) =>
                        <Table.Row key={station.id}>
                            <Table.Cell>{station.name}</Table.Cell>
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