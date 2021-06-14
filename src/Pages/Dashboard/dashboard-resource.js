import axios from "axios";
const session = sessionStorage.getItem("session-id");
const url="";
const session_id=sessionStorage.getItem("session-id");

const GetPatient = (value) => {
    return axios.get(url, {
        headers: {
            Cookie: `JSESSIONID=${session_id}`
        }
    }).then(resp => {
        let response = resp.data;
        return response;
    }).catch(error => {
        return error.message;
    })
}

const AddPatient = (value) => {
    return axios.post(url, {
        headers: {
            Cookie: `JSESSIONID=${session_id}`
        }
    }).then(resp => {
        let response = resp.data;
        return response;
    }).catch(error => {
        return error.message;
    })
}

export {GetPatient, AddPatient}