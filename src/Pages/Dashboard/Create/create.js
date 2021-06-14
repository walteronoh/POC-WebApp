import './create.css';

import { Button, FormGroup, TextInput, RadioButtonGroup} from 'carbon-components-react';
import { RadioButton } from 'carbon-components-react/lib/components/RadioButton/RadioButton';
import { AddPatient } from '../dashboard-resource';

function CreatePatient(){
    return(
        <div className="create_patient">
            <form>
                <FormGroup>
                    <TextInput type="text" id="patient_name" placeholder="Patient Name" labelText="Patient Name"></TextInput>
                    <TextInput type="date" id="dob" placeholder="DOB" labelText="Date Of Birth"></TextInput>
                    <RadioButtonGroup>
                        <RadioButton name="gender" id="radio-1" labelText="Male" value="Male"></RadioButton>
                        <RadioButton name="gender" id="radio-2" labelText="Female" value="Female"></RadioButton>
                    </RadioButtonGroup>
                    <Button type="submit">Create Patient</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CreatePatient;