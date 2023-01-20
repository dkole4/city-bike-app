import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { Filter } from "../util/filter";


/**
 * Props for SortableColumns component.
 * 
 * @interface SortableColumnsProps
 * @member {string[]} names of the columns.
 * @member {Function} updateTableOrder function that takes column name
 * and sorts the table using it.
 * @member {Filter} currentFilter filter of the table currently in use.
 */
interface SortableColumnsProps {
    names: string[];
    updateTableOrder: Function;
    currentFilter: Filter;
}

const SortableColumns: React.FC<SortableColumnsProps> = (
    { names, updateTableOrder, currentFilter }
) => {
    return (
        <Table.Header>
            <Table.Row>
                {names.map((name: string) =>
                    <Table.HeaderCell key={name} onClick={() => updateTableOrder(name)}>
                        {name}
                        {currentFilter.name === name &&
                            /** Render an icon indicating the type of sorting. */
                            <Icon
                                name={currentFilter.order === "ASC"
                                    ? "caret up"
                                    : "caret down"}
                            />
                        }
                    </Table.HeaderCell>
                )}
            </Table.Row>
        </Table.Header>
    );
}

export default SortableColumns;
