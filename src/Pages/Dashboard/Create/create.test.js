import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockCheckPerson } from "../../../Mocks/mock";
import { addPatient, checkPerson} from "../dashboard-resource";
import CreatePatient from "./create";


describe("Testing Checking Person Form",()=>{
    test("Testing checking person Form Inputs",()=>{
        render(<CreatePatient/>);
        expect(screen.getByRole("textbox",{name:/Person Name/i})).toBeInTheDocument();
        expect(screen.getByRole("combobox",{name:/Gender/i})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:/Check Person/i})).toBeInTheDocument();
    });
    test("Checking On Submitting the submit button has to be hidden", async()=>{
        render(<CreatePatient/>);
        mockCheckPerson();
        const submit_btn = screen.getByRole("button",{name:"Check Person"});
        userEvent.type(screen.getByRole("textbox",{name:/Person Name/i}),"Test");
        userEvent.selectOptions(screen.getByRole("combobox",{name:/Gender/i}),"M");
        userEvent.type(screen.getByLabelText(/Date Of Birth/i),"2000-09-16");
        expect(screen.getByRole("textbox",{name:/Person Name/i})).toHaveValue("Test");
        expect(screen.getByRole("option",{name:"Male"}).selected).toBe(true);
        expect(screen.getByRole("option",{name:"Female"}).selected).toBe(false);
        expect(screen.getByLabelText(/Date Of Birth/i)).toHaveValue("2000-09-16");
        userEvent.click(submit_btn);
        expect(submit_btn).not.toBeVisible();
        const result = await checkPerson();
        expect(result.data[0].givenName).toBe("Tests");
    });
});
