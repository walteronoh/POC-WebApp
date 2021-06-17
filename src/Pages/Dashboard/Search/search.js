import { Button, FormGroup, Modal, Pagination, Search, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useState } from 'react';
import { GetPatient, listEncounters } from '../dashboard-resource';
import './search.css';
import displayEncounter from './encounter';
import ReactDOM from 'react-dom';


function PatientSearch() {
    const [response, setResponse] = useState(false);
    const [rows, setRows] = useState([]);
    const [input, setInput] = useState("");
    const [encounters, setEncounters] = useState([]);
    const [disp_encounter, dispEncounter] = useState(false);
    const [open,setOpen]=useState(true);

    const handleSearch = (e) => {
        setInput(e.target.value);
        if (input.length >= 2) {
            const result = GetPatient(input);
            result.then(resp => {
                resp ? setResponse(true) : setResponse();
                let data = [];
                for (let i = 0; i < resp.length; i++) {
                    data.push({
                        id: i,
                        identifier: resp[i].person.uuid,
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


    const displayPatient = () => {
        const headers = ['Identifier', 'Display', 'Gender', 'Age', 'Birthdate', 'Dead', 'Death Date'];
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
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {Object.keys(row)
                                    .filter((key) => key !== 'id')
                                    .map((key) => {
                                        return <TableCell key={key} onClick={getEncounter} data-uuid={row['identifier']}>{row[key]}</TableCell>;
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
                        5,
                        10,
                        25,
                        50,
                        100
                    ]}
                    totalItems={rows.length}
                />
            </div>
        )
    }

    const getEncounter = (e) => {
        const patient_id = e.target.attributes.getNamedItem('data-uuid').value;
        const result = listEncounters(patient_id);
        result.then(resp => {
            if (resp.length === 0) {
                alert(`No Encounters Found For this Patient identifier : ${patient_id}`);
            } else {
                setOpen(true);
                let data = [];
                for (let i = 0; i < resp.length; i++) {
                    data.push({
                        id: i,
                        identifier: resp[i].uuid,
                        display: resp[i].display
                    })
                }
                setEncounters(data);
                dispEncounter(true);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="patient_search">
            <FormGroup legendText="Search Patient">
                <Search placeholder="md" id="search-1" type="text" onChange={handleSearch}></Search>
            </FormGroup>
            {
                response &&
                displayPatient()

            }
            {
                disp_encounter &&
                        <Modal
                            passiveModal
                            open={open}
                            onRequestClose={() => setOpen(false)}>
                                {displayEncounter(encounters)}       
                        </Modal>
            }
        </div>
    )
}

export default PatientSearch;