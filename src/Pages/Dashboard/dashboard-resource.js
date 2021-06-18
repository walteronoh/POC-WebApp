import axios from "axios";
const url = "http://10.50.80.115:8090/amrs/ws/rest/v1/";

const GetPatient = async (value) => {
    const session_id = sessionStorage.getItem("session-id");
    try{
        const result=await axios.get(`${url}patient?q=${value}&v=default&limit=10`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        });
        return result.data.results;
    }catch(error){
        console.log(error.message)
    }
}

const listEncounters = async (uuid) => {
    const session_id = sessionStorage.getItem("session-id");
    try{
        const result=await axios.get(`${url}encounter?patient=${uuid}`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        });
        return result.data.results;
    }catch(error){
        console.log(error);
    }

}

const AddPatient = (value) => {
    const session_id = sessionStorage.getItem("session-id");
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

export { GetPatient, AddPatient, listEncounters}