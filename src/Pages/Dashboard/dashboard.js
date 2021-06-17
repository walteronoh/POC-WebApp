import { Link, NavLink, Route, Redirect, useHistory } from 'react-router-dom';
import PatientSearch from './Search/search';
import CreatePatient from './Create/create';
import './dashboard.css';
import displayEncounter from './Search/encounter';

const username=sessionStorage.getItem("username");

const bg={
  color:"green"
}

function Dashboard(){
  const path=useHistory();
  const Logout = () =>{
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("session-id");
    path.push("/")
  }

  return(
    <div className="dashboard">
        <p className="user_details">Welcome {username} <a className="logout" onClick={Logout} href="#">Logout</a></p>
            <NavLink to="/dashboard/search" activeStyle={bg}>Search Patient</NavLink>
            <NavLink to="/dashboard/create-patient" activeStyle={bg}>Create Patient</NavLink>
            <Route exact path='/dashboard/search' component={PatientSearch} />
            <Route path='/dashboard/create-patient' component={CreatePatient} />
            <Route path='/dashboard/encounter' component={displayEncounter} />
      
    </div>
  )
}

export default Dashboard;