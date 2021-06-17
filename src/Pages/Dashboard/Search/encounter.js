import { FormGroup, Pagination, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';

const displayEncounter = (encounters) => {
    const headers=["Identifier","Display"];
    return (
        <div>
            <h2>Patient Encounters</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHeader key={header}>{header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {encounters.map((row) => (
                        <TableRow key={row.id}>
                            {Object.keys(row)
                                .filter((key) => key !== 'id')
                                .map((key) => {
                                    return <TableCell key={key} >{row[key]}</TableCell>;
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
                pageSize={10}
                pageSizes={[
                    10,
                    20,
                    30,
                    40,
                    50
                ]}
                totalItems={20}
            />
        </div>
    )
}

export default displayEncounter;