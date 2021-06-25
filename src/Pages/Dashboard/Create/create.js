import './create.css';

import { Button, FormGroup, TextInput, Select, SelectItem, Table, TableHead, TableHeader, TableRow, TableBody, TableCell, Pagination } from 'carbon-components-react';
import { addPatient, checkPerson } from '../dashboard-resource';
import { useState } from 'react';

function CreatePatient() {
    const [personName, setPersonName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [village, setVillage] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [identifierType, setIdentifierType] = useState("");
    const [identifierLocation, setIdentifierLocation] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [checkButtonStatus, setCheckButtonStatus] = useState(true);
    const [uuid, setUuid] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitButton, setSubmitStatus] = useState(false);

    const checkPersonExistence = (e) => {
        e.preventDefault();
        if (personName.trim() === "" || gender.trim() === "" || birthDate.trim() === "") {
            setError("All The Fields Are Required");
        } else {
            setError()
            setShowInput(false);
            setCheckButtonStatus(false);
            let currentDate = Date.now();
            let parsedAge = Date.parse(birthDate);
            let convertedDate = new Date(currentDate - parsedAge);
            let getYear = convertedDate.getUTCFullYear();
            let age = getYear - 1970;
            let range = (x) => {
                let min = age - 2;
                let max = age + 2;
                if (x >= min && x <= max) {
                    return x;
                }
            }

            const result = checkPerson(personName);
            result.then(response => {
                const results = response.filter(data => data.gender === gender && range(data.age)).map(data => {
                    let birthdate = data.birthdate.split("T")[0];
                    return {
                        id: data.uuid,
                        uuid: data.uuid,
                        givenName: data.names[0].givenName,
                        middleName: data.names[0].middleName,
                        familyName: data.names[0].familyName,
                        age: data.age,
                        gender: data.gender,
                        birthdate: birthdate
                    }
                })
                if (results.length === 0) {
                    setShowInput(true)
                } else {
                    setRows(results);
                }

            }).catch(error => console.log("somer errors", error));
        }
    }

    const [rows, setRows] = useState([]);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(5);
    const displayIdenticalPersons = () => {
        const headers = ['UUID', 'Given Name', 'Middle Name', 'Family Name', 'Age', 'Gender', 'Birthdate'];
        return (
            <div>
                <h6>The following is a list of people similar to the one you are about to create. If the person already exists, select from the list.</h6>
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
                            <TableRow key={row.id} onClick={addPatientData}>
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
                <button onClick={displayInputs}>I cannot find the person on the list</button>
                <button onClick={hideInputs}>Cancel</button>
            </div>
        )
    }

    const displayInputs = (e) => {
        setRows([])
        setShowInput(true)
    }
    const hideInputs = (e) => {
        setShowInput(false);
        setRows([]);
        setCheckButtonStatus(true)
    }

    const addPatientData = (e) => {
        let uuid = e.target.attributes.getNamedItem('data-uuid').value;
        let result = rows.filter(data => data.uuid === uuid);
        setUuid(uuid);
        setPersonName(result[0].givenName, result[0].familyName, result[0].middleName);
        setGender(result[0].gender);
        setBirthDate(result[0].birthdate.split("T")[0])
        setRows([]);
        setShowInput(true);
    }

    const addInputs = () => {
        return (
            <>
                <TextInput onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" placeholder="Address" labelText="Address"></TextInput>
                <TextInput onChange={(e) => setVillage(e.target.value)} type="text" name="village" id="village" placeholder="Village" labelText="Village"></TextInput>
                <TextInput onChange={(e) => setCountry(e.target.value)} type="text" name="country" id="country" placeholder="Country" labelText="Country"></TextInput>
                <TextInput onChange={(e) => setPostalCode(e.target.value)} type="text" name="postalCode" id="postalCode" placeholder="Postal code" labelText="Postal Code"></TextInput>
                <TextInput onChange={(e) => setIdentifier(e.target.value)} type="text" name="identifier" id="identifier" placeholder="Identifier" labelText="Identifier *"></TextInput>
                <Select onChange={(e) => setIdentifierType(e.target.value)} name="identifierType" id="identifierType" labelText="Identifier Type *">
                    <SelectItem text="Choose Identifier Type" />
                    <SelectItem value="Dummy Identifier" text="Dummy Identifier" />
                </Select>
                <Select onChange={(e) => setIdentifierLocation(e.target.value)} name="identifierLocation" id="identifierLocation" labelText="Identifier Location *">
                    <SelectItem text="Choose Identifier Location" />
                    <SelectItem value="Location-1" text="Location-1" />
                </Select>
                <Button type="submit" disabled={submitButton}>Add Patient</Button>
                <p className="success">{success}</p>
            </>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (personName !== "" && gender !== "" && birthDate !== "" && identifier !== "" && identifierType !== "" && identifierLocation !== "") {
            setError()
            let splitName = personName.split(" ");
            let firstName = splitName[0];
            let lastName = "";
            if (splitName.length > 1) {
                lastName = splitName[1]
            }
            let data = JSON.stringify({
                names: [{
                    givenName: firstName,
                    familyName: lastName
                }],
                gender: gender,
                birthdate: birthDate,
                addresses: [{
                    address1: address,
                    cityVillage: village,
                    country: country,
                    postalCode: postalCode
                }]
            });
            let identifiers = {
                identifier: identifier,
                identifierType: identifierType,
                identifierLocation: identifierLocation
            }
            const add_patient = addPatient(data, identifiers, uuid);
            add_patient.then(response => {
                if (response.status === 201) {
                    setSubmitStatus(true);
                    setSuccess("Patient Has Been Added")
                    setTimeout(() => {
                        setSubmitStatus(false)
                        setShowInput(false);
                        setCheckButtonStatus(true)
                        setSuccess("")
                    }, 3000);
                }
            }).catch(error=>console.log(error.message))
        } else {
            setError("All fields are required")
        }
    }

    return (
        <div className="create_patient">
            <p className="error">{error}</p>
            <form onSubmit={handleSubmit}>
                <p>All the fields marked with (*) are required</p>
                <FormGroup legendText="">
                    <TextInput onChange={(e) => setPersonName(e.target.value)} type="text" name="personName" id="personName" placeholder="Person Name" labelText="Person Name  *" value={personName}></TextInput>
                    <Select onChange={(e) => setGender(e.target.value)} value={gender} name="gender" id="gender" labelText="Gender *">
                        <SelectItem text="Choose Gender" />
                        <SelectItem value="M" text="Male" />
                        <SelectItem value="F" text="Female" />
                    </Select>
                    <TextInput onChange={(e) => setBirthDate(e.target.value)} type="date" name="dob" id="dob" placeholder="DOB" labelText="Date Of Birth *" value={birthDate}></TextInput>
                    {
                        checkButtonStatus &&
                        <Button onClick={checkPersonExistence}>Check Person</Button>
                    }
                    {
                        showInput &&
                        addInputs()
                    }
                    {
                        rows.length !== 0 &&
                        displayIdenticalPersons()
                    }
                </FormGroup>
            </form>
        </div>
    )
}

export default CreatePatient;