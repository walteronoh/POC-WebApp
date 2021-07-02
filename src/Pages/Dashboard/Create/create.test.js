import { render } from "@testing-library/react";
import axios from "axios";
import { addPatient, checkPerson } from "../dashboard-resource";
import CreatePatient from "./create";

jest.mock("axios");

describe("Testing Creating person api", ()=>{
    it("Tests Check Person component", async()=>{
        render(<CreatePatient/>);
        axios.get.mockResolvedValue({
            data:{
                results:{
                    users: "Tests"
                }
            }
        });
        const result = await checkPerson();
        expect(result.users).toBe("Tests");
    });
    // it("Tests if creating person api endpoint works", async()=>{
    //     render(<CreatePatient/>);
    //     axios.post.mockResolvedValue({
    //         status:201
    //     });
    //     const result = await addPatient();
    //     expect(axios.post).toHaveBeenCalled();
    // });
});