import { Button, FormGroup, Modal, Pagination, Search, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useState } from 'react';
import { GetPatient, listEncounters } from '../dashboard-resource';
import './search.css';
import ReactDOM from 'react-dom';


function PatientSearch() {
    const [response, setResponse] = useState(false);
    const [rows, setRows] = useState([]);
    const [input, setInput] = useState("");
    const [encounters, setEncounters] = useState([]);
    const [disp_encounter, dispEncounter] = useState(false);
    const [open, setOpen] = useState(true);
    const [obsStatus, setObsStatus] =useState(false);
    const [obsRows, setObsRows] = useState([]);
    const [error, setError] = useState();

    const handleSearch = (e) => {
        setInput(e.target.value);
        if (input.length >= 2) {
            const result = GetPatient(input);
            result.then(resp => {
                resp ? setResponse(true) : setResponse();
                let data = [];
                for (let i = 0; i < resp.length; i++) {
                    let check_identifier = setIdentifier(resp[i].identifiers);
                    data.push({
                        id: i,
                        identifier: check_identifier,
                        uuid: resp[i].person.uuid,
                        display: resp[i].person.display,
                        gender: resp[i].person.gender,
                        age: resp[i].person.age,
                        birthdate: resp[i].person.birthdate,
                        dead: resp[i].person.dead,
                        deadDate: resp[i].person.deathDate
                    })
                }
                setRows(data)
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    const setIdentifier = (value) => {
        if (value.length === 0) {
            return "No Identifier"
        }
        else {
            return value[0].identifier;
        }
    }

    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(5);
    const displayPatient = () => {
        const headers = ['Identifier', 'UUID', 'Name', 'Gender', 'Age', 'Birthdate', 'Dead', 'Death Date'];
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
        result.then(resp => {
            if (resp.length === 0) {
                setError(`No Encounters Found For this UUID : ${patient_id}`);
            } else {
                setOpen(true);
                let data = [];
                let obs = [];
                for (let i = 0; i < resp.length; i++) {
                    data.push({
                        id: i,
                        date: resp[i].encounterDatetime,
                        type: resp[i].encounterType.display
                    })
                    for(let k=0; k<resp[i].obs.length; k++){
                        obs.push({
                            id:k,
                            date:resp[i].obs[k].obsDatetime,
                            display:resp[i].obs[k].display,
                            concept:resp[i].obs[k].concept.display,
                            // value:resp[i].obs[k].value,
                            // valueCoded:resp[i].obs[k].valueCodedName
                        })
                    }
                }
                setObsRows(obs.reverse());
                setEncounters(data.reverse());
                dispEncounter(true);
            }
        }).catch(error => {
            console.log(error)
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
                            <TableRow key={row.id} onClick={checkEncounterType}>
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

    const [sortedObs,setSortedObs]=useState([]);
    const [obsRowIndex, setObsRowIndex] = useState(0);
    const [obsPageSize, setObsPageSize] = useState(5);
    const displayObs = () =>{
        const headers=["Date","Obs Name","Concept","Value","Value Coded Name"];
        return (
            <div>
                <h3>Observations</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header)=>(
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedObs.slice(obsRowIndex, obsRowIndex + obsPageSize).map((row) => (
                            <TableRow key={row.id} onClick={checkEncounterType}>
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

    const checkEncounterType=(e)=>{
        let date=e.target.attributes.getNamedItem('data-date').value;
        let new_obs=obsRows.filter(key=>key.date == date);
        setSortedObs(new_obs);
        setObsStatus(true); 
    }

    return (
        <div className="patient_search">
            <p className="error">{error}</p>
            <FormGroup legendText="Search Patient">
                <Search placeholder="md" id="search-1" type="text" onChange={handleSearch}></Search>
            </FormGroup>
            {
                response &&
                displayPatient()

            }
            {
                disp_encounter &&
                <>
                <Modal
                    passiveModal
                    open={open}
                    onRequestClose={() => { setOpen(false); setRowOneIndex(0); }}>
                    {displayEncounter()}
                </Modal>
                <Modal
                passiveModal
                open={obsStatus}
                onRequestClose={() => { setObsStatus(false); setRowOneIndex(0); }}>
                    {displayObs()}
                </Modal>
                </>
            }
        </div>
    )
}

export default PatientSearch;