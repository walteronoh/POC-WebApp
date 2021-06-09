import { Button, FormGroup, TextInput, RadioButtonGroup, Search } from 'carbon-components-react';
import { RadioButton } from 'carbon-components-react/lib/components/RadioButton/RadioButton';
function Dashboard(){
  return(
    <div className="dashboard">
        <p className="user_details">You are logged in as <a className="logout" href="logout">Logout</a></p>
        <PatientSearch/>
        <CreatePatient/>
    </div>
  )
}
function PatientSearch(){
    return(
        <div className="patient_search">
            <form>
                <FormGroup legendText="Search Patient">
                    <Search placeholder="md" id="search-1"></Search>
                </FormGroup>
            </form>
        </div>
    )
}
function CreatePatient(){
    return(
        <div className="create_patient">
            <form>
                <FormGroup>
                    <TextInput type="text" placeholder="Patient Name" labelText="Patient Name"></TextInput>
                    <TextInput type="date" placeholder="DOB" labelText="Date Of Birth"></TextInput>
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
export default Dashboard;