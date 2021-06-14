import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import PatientSearch from './Search/search';
import CreatePatient from './Create/create';
import './dashboard.css';
const username=sessionStorage.getItem("username");

const bg={
  color:"green"
}

const Logout = () =>{
  sessionStorage.removeItem("username");
  return (
    <Redirect to="/" />
  )
}

function Dashboard(){
  return(
    <div className="dashboard">
        <p className="user_details">Welcome {username} <a className="logout" onClick={Logout} href="#">Logout</a></p>
            { sessionStorage.getItem("username") ?? <Redirect to='/'/> }
            <NavLink to="/dashboard/search" activeStyle={bg}>Search Patient</NavLink>
            <NavLink to="/dashboard/create-patient" activeStyle={bg}>Create Patient</NavLink>
            <Route exact path='/dashboard/search' component={PatientSearch} />
            <Route path='/dashboard/create-patient' component={CreatePatient} />
      
    </div>
  )
}

export default Dashboard;