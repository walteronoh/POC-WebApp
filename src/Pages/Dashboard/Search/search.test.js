import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockGetPatient, mockListEncounter } from "../../../Mocks/mock";
import { GetPatient, listEncounters } from "../dashboard-resource";
import PatientSearch from "./search";

describe("Testing Patient Search Component",()=>{
    test("Testing Search Labels",()=>{
        render(<PatientSearch/>);
        const searchLabel= screen.getByText(/Search Patient/i);
        expect(searchLabel).toBeInTheDocument();
        const search_input= screen.getByRole("searchbox");
        expect(search_input).toBeInTheDocument();
        expect(search_input).toHaveAttribute("type","text")
    })
})

describe("Testing search patient api endpoint",()=>{
    test("Testing the GetPatient component", async() => {
        render(<PatientSearch/>);
        mockGetPatient();
        const result= await GetPatient();
        expect(result.data.users).toEqual("Test");
    });   
});

describe("Testing get encounter api endpoint", ()=>{
    test("Testing the list Encounters component", async() => {
        render(<PatientSearch/>);
        mockListEncounter()
        const result= await listEncounters();
        expect(result.data.encounter).toEqual("Encounter");
    });
})