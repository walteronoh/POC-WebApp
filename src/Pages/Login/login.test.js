import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { mockGetUser } from "../../Mocks/mock";
import Login from "./login";
import getUser from "./login-resource";

jest.mock("axios");

describe("Testing Login Component", ()=>{
  test("Testing if it renders the login page correctly", ()=>{
    render(<Login/>);
    const logo=screen.getByAltText(/Logo/i);
    const usernameLabel = screen.getByText(/Username/i);
    const passwordLabel = screen.getByText(/Password/i);
    const submit_btn = screen.getByRole("button");
    const username_input=screen.getByLabelText(/Username/i);
    const password_input = screen.getByLabelText(/Password/i);
    expect(logo).toBeInTheDocument();
    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(submit_btn).toBeInTheDocument();
    expect(username_input).toHaveAttribute("type","text");
    expect(password_input).toHaveAttribute("type","password");
    expect(submit_btn).toHaveAttribute("type","submit","disabled");
  })

  test("Submit button should be enabled if all the input fields are filled",()=>{
    render(<Login/>);
    const submit_btn = screen.getByRole("button");
    const username_input=screen.getByLabelText(/Username/i);
    const password_input = screen.getByLabelText(/Password/i);
    userEvent.type(username_input,"Test");
    userEvent.type(password_input,"1234");
    expect(submit_btn).toBeEnabled();
  })
})

describe("Mocking Api Request",()=>{
  it("Returns data from the axios fetch", async()=>{
    render(<Login/>);
    const submit_btn = screen.getByRole("button");
    const username_input= screen.getByLabelText(/Username/i);
    const password_input = screen.getByLabelText(/Password/i);
    mockGetUser();
    const result = await getUser("Test","1234");
    expect(result.authenticated).toEqual(true);
    expect(axios.get).toHaveBeenCalledWith(
      "https://kibana.ampath.or.ke/amrs/ws/rest/v1/session",
      {
        headers:{
          Authorization: "Basic VGVzdDoxMjM0"
        }
      }
    );
  })
})


