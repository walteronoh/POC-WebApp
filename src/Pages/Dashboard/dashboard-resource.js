import axios from "axios";
import { baseURL } from "../../Constants/constant";
const session_id = sessionStorage.getItem("session-id");
let header = {
    headers: {
        Authorization: `Basic ${session_id}`,
        "Content-Type": "application/json",
    }
}

const GetPatient = async (value) => {
    try {
        const result = await axios.get(`${baseURL}patient?q=${value}&v=full&limit=10`, header);
        return result.data.results;
    } catch (error) {
        console.log(error.message)
    }
}

const listEncounters = async (uuid) => {
    try {
        const result = await axios.get(`${baseURL}encounter?patient=${uuid}&v=full`, header);
        return result.data.results;
    } catch (error) {
        console.log(error);
    }

}

const checkPerson = async (value) => {
    try {
        const result = await axios.get(`${baseURL}person?q=${value}&v=full`, header)
        return result.data.results;
    } catch (error) {
        console.log(error)
    }
}

const addPatient = async (data, identifiers, uuid) => {
    let person_uuid = uuid;
    try {
        person_uuid === "" &&
            await axios(`${baseURL}person`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${session_id}`,
                    "Content-Type": "application/json",
                },
                data: data
            }).then(resp => {
                person_uuid = resp.data.uuid
            })

        if (person_uuid) {
            let patient_data = JSON.stringify({
                person: person_uuid,
                identifiers: [{
                    identifier: identifiers.identifier,
                    identifierType: identifiers.identifierType,
                    location: identifiers.identifierLocation,
                    preferred: false
                }]
            })
            const create_patient = await axios(`${baseURL}patient`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${session_id}`,
                    "Content-Type": "application/json",
                },
                data: patient_data
            })
            return create_patient;
        }
    } catch (error) {
        console.log(error.message)
    }
}

const getLocations = async () => {
    try {
        const location = await axios.get(`${baseURL}location`, header);
        return location.data.results;
    } catch (error) {
        console.log(error);
    }
}

const getPatientIdentierType = async () => {
    try {
        const result = await axios.get(`${baseURL}patientidentifiertype`, header)
        return result.data.results;
    } catch (error) {
        console.log(error)
    }
}

export { GetPatient, addPatient, listEncounters, checkPerson, getPatientIdentierType, getLocations }