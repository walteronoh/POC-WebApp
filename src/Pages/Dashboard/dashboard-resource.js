import axios from "axios";
const url = "http://10.50.80.115:8090/amrs/ws/rest/v1/";

const GetPatient = async (value) => {
    const session_id = sessionStorage.getItem("session-id");
    try {
        const result = await axios.get(`${url}patient?q=${value}&v=full&limit=10`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        });
        return result.data.results;
    } catch (error) {
        console.log(error.message)
    }
}

const listEncounters = async (uuid) => {
    const session_id = sessionStorage.getItem("session-id");
    try {
        const result = await axios.get(`${url}encounter?patient=${uuid}&v=full`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        });
        return result.data.results;
    } catch (error) {
        console.log(error);
    }

}

const checkPerson = async (value) => {
    const session_id = sessionStorage.getItem("session-id");
    try {
        const result = await axios.get(`${url}person?q=${value}&v=full`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        })
        return result.data.results;
    } catch (error) {
        console.log(error)
    }
}

const getPatientIdentierType = async () => {
    const session_id = sessionStorage.getItem("session-id");
    try {
        const result = await axios.get(`${url}patientidentifiertype?v=full`, {
            headers: {
                Authorization: `Basic ${session_id}`
            }
        })
        return result.data.results;
    } catch (error) {
        console.log(error)
    }
}

const addPatient = async (data, identifiers, uuid) => {
    const session_id = sessionStorage.getItem("session-id");
    let person_uuid = uuid;
    try {
        person_uuid === "" &&
            await axios(`${url}person`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${session_id}`,
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
            const create_patient = await axios(`${url}patient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${session_id}`
                },
                data: patient_data
            })
            return create_patient;
        }
    } catch (error) {
        console.log(error.message)
    }
}

export { GetPatient, addPatient, listEncounters, checkPerson, getPatientIdentierType }