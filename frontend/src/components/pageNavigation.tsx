import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "semantic-ui-react";


interface PageNavigationProps {
    listType: "journeys" | "stations";
    page: number;
};

const PageNavigation: React.FC<PageNavigationProps> = ({ listType, page }) => {
    const accessibleRange: number = 11;
    const pagesBySide: number = Math.floor(accessibleRange / 2);

    const pageNumberStyle = { fontWeight: "bold" };

    return (
        <Container>
            <Table>
                <Table.Header>
                    <Table.Row>
                        {/* Add the first page to the left side to make moving to
                            the start of the list easier for the user. */
                            (page > pagesBySide)
                                ? (
                                    <>
                                        <Table.Cell>
                                            <Button as={Link}
                                                fluid
                                                style={pageNumberStyle}
                                                to={`/${listType}/0`}
                                            >
                                                0
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>...</Table.Cell>
                                    </>
                                )
                                : null}
                        {/* Make links to pages that are in the range of
                            [-5, 5] relative to the current page. */
                            Array
                                .from(
                                    { length: accessibleRange },
                                    (_, i) => page + i - Math.min(page, pagesBySide))
                                .map((pageNumber) => {
                                    return (
                                        <Table.Cell key={pageNumber}>
                                            <Button as={Link}
                                                disabled={page === pageNumber}
                                                fluid
                                                style={pageNumberStyle}
                                                to={`/${listType}/${pageNumber}`}
                                            >
                                                {pageNumber}
                                            </Button>
                                        </Table.Cell>
                                    )
                                })
                        }
                        <Table.Cell>...</Table.Cell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </Container>
    );
};

export default PageNavigation;