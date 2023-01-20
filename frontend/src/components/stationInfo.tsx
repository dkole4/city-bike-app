import React, { useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

import StationService, { StationView } from "../services/stationService";
import MapView from "./mapView";


const StationInfo: React.FC<{}> = () => {
    const [station, setStation] = useState<StationView | null>(null);
    const navigate: NavigateFunction = useNavigate();

    const params: Readonly<Params<string>> = useParams();
    const stationId: number = params.stationId ? parseInt(params.stationId) : -1;

    useEffect(() => {
        // Navigate to the first page if negative page number was passed,
        // fetch station data otherwise.
        if (stationId < 0) {
            navigate("/stations/0");
        }
        else {
            StationService
                .getStation(stationId)
                .then((value: StationView | undefined) => {
                    if (!value) {
                        navigate("/stations/0");
                    }
                    else {
                        setStation(value);
                    }
                });
        }
    }, [stationId, navigate]);

    return (
        <Container>
            <Header className="Station-view">
                Station view, ID: {stationId}
            </Header>
            {station &&
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Departure Count</Table.HeaderCell>
                            <Table.HeaderCell>Average Departure Distance</Table.HeaderCell>
                            <Table.HeaderCell>Return Count</Table.HeaderCell>
                            <Table.HeaderCell>Average Return Distance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{station.name}</Table.Cell>
                            <Table.Cell>{station.address}</Table.Cell>
                            <Table.Cell>{station.departure_count}</Table.Cell>
                            <Table.Cell>{station.average_departure_distance}</Table.Cell>
                            <Table.Cell>{station.return_count}</Table.Cell>
                            <Table.Cell>{station.average_return_distance}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan={6}>
                                <MapView
                                    latitude={station.latitude}
                                    longitude={station.longitude}
                                />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            }
        </Container>
    );
};

export default StationInfo;