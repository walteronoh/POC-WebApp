import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockCreatePatient, mockPatientSearch } from "../../Mocks/mock";
import CreatePatient from "./Create/create";
import Dashboard from "./dashboard";
import PatientSearch from "./Search/search";

jest.mock("./Search/search");
jest.mock("./Create/create");
jest.mock("../Login/login");

describe("Testing Dashboard Component", () => {
   
    test("Testing Text Display", () => {
        render(<Dashboard />);
        const search_text = screen.getByText("Search Patient");
        const create_text = screen.getByText("Create Patient");
        const welcome_text = screen.getByText("Welcome");
        const logout_text = screen.getByRole("link",{name:/Logout/i});
        expect(search_text).toBeInTheDocument();
        expect(create_text).toBeInTheDocument();
        expect(welcome_text).toBeInTheDocument();
        expect(logout_text).toBeInTheDocument();
    });
    test("Testing if search patient button renders PatientSearch module onClick", () => {
        PatientSearch.mockImplementation(() => <div>search Form</div>);
        CreatePatient.mockImplementation(()=> <div>Create Patient Form</div>); 

        render(<Dashboard/>);
        userEvent.click(screen.getByRole("link",{name:/Search Patient/i}));
        expect(screen.getByText("search Form")).toBeInTheDocument();
        expect(screen.getByText("search Form")).toBeInTheDocument();
        userEvent.click(screen.getByRole("link",{name:/Create Patient/i}));
        expect(screen.getByText("Create Patient Form")).toBeInTheDocument();
    });
})
