import { Pagination, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "carbon-components-react";
import { useState } from "react";

const DisplayPatient = (props) => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(5);
    const headers = ['Identifier', 'UUID', 'Name', 'Gender', 'Age', 'Birthdate'];
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHeader key={header}>{header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row) => (
                        <TableRow key={row.id} onClick={getEncounter}>
                            {Object.keys(row)
                                .filter((key) => key !== 'id')
                                .map((key) => {
                                    return <TableCell key={key} data-uuid={row['uuid']}>{row[key]}</TableCell>;
                                })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                page={1}
                pageNumberText="Page Number"
                pageSize={currentPageSize}
                pageSizes={[
                    5,
                    10,
                    25,
                    50,
                    100
                ]}
                totalItems={props.rows.length}
                onChange={({ page, pageSize }) => {
                    if (pageSize !== currentPageSize) {
                        setCurrentPageSize(pageSize);
                    }
                    setFirstRowIndex(pageSize * (page - 1));
                }}
            />
        </div>
    )
}

const getEncounter = (e) => {
    console.log(e)
}

export default DisplayPatient;