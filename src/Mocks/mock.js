import axios from "axios";
jest.mock("axios");
const mockCheckPerson = () => {
    axios.get.mockResolvedValue({
        data: [
            {
                id: "qwertyuiop",
                uuid: "ha9fne",
                givenName: "Tests"
            },
            {
                id: "qwerty",
                uuid: "jlfkajlfa",
                givenName: "Test2"
            }
        ]
    });
}

const mockGetPatient = () => {
    axios.get.mockResolvedValue({
        data: {
            users: "Test"
        }
    });
}

const mockListEncounter = () => {
    axios.get.mockResolvedValue({
        data: {
            encounter: "Encounter"
        }
    });
}

const mockGetUser = () => {
    axios.get.mockResolvedValue({
        data: {
            authenticated: true
        }
    });
}

export { mockCheckPerson, mockGetPatient, mockListEncounter, mockGetUser }