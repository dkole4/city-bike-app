import React from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";

const SiteNavigation: React.FC<{}> = () => {
    return (
        <Container>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Link to={"/"}>Front Page</Link>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Link to={"/journeys/0"}>Journeys</Link>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Link to={"/stations/0"}>Stations</Link>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </Container>
    );
};

export default SiteNavigation;