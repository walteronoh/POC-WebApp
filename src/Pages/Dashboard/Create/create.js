import './create.css';

import { Button, FormGroup, TextInput, RadioButtonGroup } from 'carbon-components-react';
import { RadioButton } from 'carbon-components-react/lib/components/RadioButton/RadioButton';
import { AddPatient } from '../dashboard-resource';
import { useState } from 'react';

function CreatePatient() {
    const [given_name, setGivenName]=useState("");
    const [family_name, setFamilyName]=useState("");
    const [gender, setGender]=useState("");
    const [birthdate, setBirthDate]=useState("");
    const [address, setAddress]=useState("");
    const [village, setVillage]=useState("");
    const [country, setCountry]=useState("");
    const [postal_code, setPostalCode]=useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {


    }

    return (
        <div className="create_patient">
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <TextInput onChange={handleChange} type="text" name="given_name" id="given_name" placeholder="Given Name" labelText="Given Name"></TextInput>
                    <TextInput onChange={handleChange} type="text" name="family_name" id="family_name" placeholder="Family Name" labelText="Family Name"></TextInput>
                    <RadioButtonGroup name="gender" onChange={handleChange} defaultSelected="radio-1">
                        <RadioButton id="radio-1" labelText="Male" value="Male"></RadioButton>
                        <RadioButton id="radio-2" labelText="Female" value="Female"></RadioButton>
                    </RadioButtonGroup>
                    <TextInput onChange={handleChange} type="date" name="dob" id="dob" placeholder="DOB" labelText="Date Of Birth"></TextInput>
                    <TextInput onChange={handleChange} type="text" name="address" id="address" placeholder="Address" labelText="Address"></TextInput>
                    <TextInput onChange={handleChange} type="text" name="village" id="village" placeholder="Village" labelText="Village"></TextInput>
                    <TextInput onChange={handleChange} type="text" name="country" id="country" placeholder="Country" labelText="Country"></TextInput>
                    <TextInput onChange={handleChange} type="text" name="postal_code" id="postal_code" placeholder="Postal code" labelText="Postal Code"></TextInput>
                    <Button type="submit">Create Patient</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CreatePatient;