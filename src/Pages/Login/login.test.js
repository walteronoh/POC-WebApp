import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Login from "./login";
import getUser from "./login-resource";
jest.mock("axios");

//Login Component tests
describe("Testing Login Component", ()=>{
  //Testing the user interface
  test("Testing if it renders the login page correctly", ()=>{
    render(<Login/>);
    const logo=screen.getByAltText(/Logo/i);
    const usernameLabel = screen.getByText(/Username/i);
    const passwordLabel = screen.getByText(/Password/i);
    const submit_btn = screen.getByRole("button");
    const username_input=screen.getByLabelText(/Username/i);
    const password_input = screen.getByLabelText(/Password/i);
    //Checking Logo
    expect(logo).toBeInTheDocument();
    //Checking Username Label
    expect(usernameLabel).toBeInTheDocument();
    //Checking Password Label
    expect(passwordLabel).toBeInTheDocument();
    //Checking if Submit Button exists
    expect(submit_btn).toBeInTheDocument();
    //Checking Username attributes
    expect(username_input).toHaveAttribute("type","text");
    //Checking Password attributes
    expect(password_input).toHaveAttribute("type","password");
    //Checking Submit Button attributes
    expect(submit_btn).toHaveAttribute("type","submit","disabled");
  })

  //Submit button should be enabled if all the input fields are filled
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

//Mocking API Request
describe("Mocking Api Request",()=>{
  it("Returns data from the axios fetch", async()=>{
    render(<Login/>);
    const submit_btn = screen.getByRole("button");
    const username_input= screen.getByLabelText(/Username/i);
    const password_input = screen.getByLabelText(/Password/i);
    axios.get.mockResolvedValue({
      data:{
        authenticated:true
      }
    });
    const result = await getUser("Test","1234");
    expect(result.authenticated).toEqual(true);
    expect(axios.get).toHaveBeenCalledWith(
      "https://kibana.ampath.or.ke/amrs/ws/rest/v1/session",
      {
        headers:{
          Authorization: "Basic VGVzdDoxMjM0"
        }
      }
    )
  })
})


