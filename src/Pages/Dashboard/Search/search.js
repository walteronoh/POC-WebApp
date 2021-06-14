import { Button, FormGroup, Search } from 'carbon-components-react';
import { useState } from 'react';
import { GetPatient } from '../dashboard-resource';
import './search.css';

function PatientSearch() {
    const [limit, setLimit] = useState(10);
    const [input,setInput]=useState("");

    const handleSearch = (e) => {
        let value = e.target.value.trim();
        const result= GetPatient(limit,value);
    }

    return (
        <div className="patient_search">
            <FormGroup legendText="Search Patient">
                <Search placeholder="md" id="search-1" type="text" onChange={handleSearch}></Search>
            </FormGroup>
        </div>
    )
}

export default PatientSearch;