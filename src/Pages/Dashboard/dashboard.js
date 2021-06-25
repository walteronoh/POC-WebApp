import { NavLink, Route, useHistory } from 'react-router-dom';
import PatientSearch from './Search/search';
import CreatePatient from './Create/create';
import './dashboard.css';
import logo from '../Login/icon/openmrs.png';

const bg = {
  backgroundColor: "#ccc"
}

function Dashboard() {
  const username = sessionStorage.getItem("username");
  const path=useHistory();
  const logout=(e)=>{
    path.push('/');
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("session-id")
  }

  return (
    <div className="dashboard">
      <img className="bg-img" src={logo} alt="Background img"/>
      <div className="nav-bar">
        <NavLink className="search" to="/dashboard/search" activeStyle={bg}>Search Patient</NavLink>
        <NavLink className="create" to="/dashboard/create-patient" activeStyle={bg}>Create Patient</NavLink>
        <p className="user_details">Welcome {username} <a className="logout" onClick={logout} href="/">Logout</a></p>
      </div>

      <Route exact path='/dashboard/search' component={PatientSearch} />
      <Route path='/dashboard/create-patient' component={CreatePatient} />
    </div>
  )
}

export default Dashboard;