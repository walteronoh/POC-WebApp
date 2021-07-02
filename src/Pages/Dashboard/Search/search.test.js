import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { GetPatient, listEncounters } from "../dashboard-resource";
import PatientSearch from "./search";

jest.mock("axios");

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
    it("Testing the GetPatient component", async() => {
        render(<PatientSearch/>);
        axios.get.mockResolvedValue({
            data:{
                results:{
                    users:"Test"
                }
            }
        });
        const result= await GetPatient();
        expect(result.users).toEqual("Test");
    });   
});

describe("Testing get encounter api endpoint", ()=>{
    it("Testing the list Encounters component", async() => {
        render(<PatientSearch/>);
        axios.get.mockResolvedValue({
            data:{
                results:{
                    encounter: "Encounter"
                }
            }
        });
        const result= await listEncounters();
        expect(result.encounter).toEqual("Encounter");
    });
})