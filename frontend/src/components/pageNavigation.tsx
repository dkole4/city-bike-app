import React from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";


interface PageNavigationProps {
    listType: "journeys" | "stations";
    page: number;
};

const PageNavigation: React.FC<PageNavigationProps> = ({ listType, page }) => {
    const accessibleRange: number = 11;
    const pagesBySide: number = Math.floor(accessibleRange / 2);

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
                                            <Link to={`/${listType}/0`}>0</Link>
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
                                            <Link to={`/${listType}/${pageNumber}`}>{pageNumber}</Link>
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