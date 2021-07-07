import { FormGroup, Modal, Pagination, Search, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useState } from 'react';
import { DateFormat } from '../../../Constants/constant';
import { GetPatient, listEncounters } from '../dashboard-resource';

import './search.css';


function PatientSearch() {
    const [response, setResponse] = useState(false);
    const [rows, setRows] = useState([]);
    const [input, setInput] = useState("");
    const [encounters, setEncounters] = useState([]);
    const [disp_encounter, dispEncounter] = useState(false);
    const [open, setOpen] = useState(true);
    const [obsStatus, setObsStatus] = useState(false);
    const [obsRows, setObsRows] = useState([]);
    const [error, setError] = useState();
    const [sortedObs, setSortedObs] = useState([]);

    const handleSearch = (e) => {
        setInput(e.target.value);
        if (input.length > 2) {
            const result = GetPatient(input);
            if (result.length > 0) {
                const data = result.data.results;
                data.then(resp => {
                    if (resp.length > 0) {
                        setResponse(true)
                        let data = HandleSearchResponse(resp);
                        setRows(data);
                        setError()
                    } else {
                        setError("No user found");
                    }
                }).catch(error => {
                    console.log(error.message);
                });
            }
        } else {
            setResponse()
        }
    }

    const HandleSearchResponse = (response) => {
        return response.map(data => {
            let value = data.identifiers;
            let check_identifier = value.length === 0 ? "No Identifier" : value[0].identifier;
            let person = data.person;
            return {
                id: person.uuid,
                identifier: check_identifier,
                uuid: person.uuid,
                display: person.display,
                gender: person.gender,
                age: person.age,
                birthdate: DateFormat(person.birthdate)
            }
        })
    }

    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(5);
    const displayPatient = () => {
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
                        {rows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row) => (
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
                    totalItems={rows.length}
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
        const patient_id = e.target.attributes.getNamedItem('data-uuid').value;
        const result = listEncounters(patient_id);
        if (result.length > 0) {
            const data = result.data.results;
            data.then(resp => {
                setOpen(true);
                let data = handleEncounters(resp);
                let obs = handleObservation(resp);
                setObsRows(obs.reverse());
                setEncounters(data.reverse());
                dispEncounter(true);

            }).catch(error => {
                console.log(error)
            });
        } else {
            setError(`No Encounters Found For this UUID : ${patient_id}`);
        }
    }


    const handleEncounters = (resp) => {
        return resp.map(response => {
            return {
                id: response.uuid,
                date: DateFormat(response.encounterDatetime),
                type: response.encounterType.display
            }
        })
    }

    const handleObservation = (resp) => {
        return resp.map(response => {
            return response.obs
        })
    }

    const [rowOneIndex, setRowOneIndex] = useState(0);
    const [encounterPageSize, setEncounterPageSize] = useState(5);
    const displayEncounter = () => {
        const headers = ["Date", "Encounter Type"];
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
                        {encounters.slice(rowOneIndex, rowOneIndex + encounterPageSize).map((row) => (
                            <TableRow key={row.id} onClick={getObservation}>
                                {Object.keys(row)
                                    .filter((key) => key !== 'id')
                                    .map((key) => {
                                        return <TableCell key={key} data-date={row['date']}>{row[key]}</TableCell>;
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
                    pageSize={encounterPageSize}
                    pageSizes={[
                        5,
                        10,
                        25,
                        50,
                        100
                    ]}
                    totalItems={encounters.length}
                    onChange={({ page, pageSize }) => {
                        if (pageSize !== encounterPageSize) {
                            setEncounterPageSize(pageSize);
                        }
                        setRowOneIndex(pageSize * (page - 1));
                    }}
                />
            </div>
        )
    }

    const getObservation = (e) => {
        let date = e.target.attributes.getNamedItem('data-date').value;
        let filtered = [];
        obsRows.forEach(results => {
            let obs = results.filter(result => DateFormat(result.obsDatetime) === date)
            obs.forEach(result => {
                filtered.push(
                    {
                        id: result.uuid,
                        date: DateFormat(result.obsDatetime),
                        concept: result.concept.display,
                        value: processObsValue(result.value)
                    }
                )
            })
        })
        setSortedObs(filtered)
        setObsStatus(true);
    }

    const processObsValue = (value) => {
        if (value) {
            if (typeof (value) === 'string' || typeof (value) === 'number') {
                return value
            }
            return value.display
        }
        return ''
    }

    const [obsRowIndex, setObsRowIndex] = useState(0);
    const [obsPageSize, setObsPageSize] = useState(5);
    const displayObs = () => {
        const headers = ["Date", "Concept", "Value"];
        return (
            <div>
                <h3>Observations</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedObs.slice(obsRowIndex, obsRowIndex + obsPageSize).map((row) => (
                            <TableRow key={row.id}>
                                {Object.keys(row)
                                    .filter((key) => key !== 'id')
                                    .map((key) => {
                                        return <TableCell key={key} data-date={row['date']}>{row[key]}</TableCell>;
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
                    pageSize={obsPageSize}
                    pageSizes={[
                        5,
                        10,
                        25,
                        50,
                        100
                    ]}
                    totalItems={sortedObs.length}
                    onChange={({ page, pageSize }) => {
                        if (pageSize !== obsPageSize) {
                            setObsPageSize(pageSize);
                        }
                        setObsRowIndex(pageSize * (page - 1));
                    }}
                />
            </div>
        )
    }


    return (
        <div className="patient_search">
            <p className="error">{error}</p>
            <FormGroup legendText="Search Patient">
                <Search id="search-1" type="text" onChange={handleSearch} labelText=""></Search>
            </FormGroup>
            {
                response &&
                displayPatient()

            }
            {
                disp_encounter &&
                <>
                    <Modal
                        size='lg'
                        preventCloseOnClickOutside
                        passiveModal
                        open={open}
                        onRequestClose={() => { setOpen(false); setRowOneIndex(0); }}>
                        {displayEncounter()}
                    </Modal>
                    <Modal
                        size='lg'
                        preventCloseOnClickOutside
                        passiveModal
                        open={obsStatus}
                        onRequestClose={() => { setObsStatus(false); setObsRowIndex(0); }}>
                        {displayObs()}
                    </Modal>
                </>
            }
        </div>
    )
}

export default PatientSearch;