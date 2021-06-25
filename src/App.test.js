import { render, screen } from '@testing-library/react';
import PatientSearch from './Pages/Dashboard/Search/search';

//Test if sessions are stored
test('Testing Username Session Storage', () =>{
  let username=sessionStorage.getItem("username");
  expect(username).toBeNull();
})

test('Testing Session-Id Session Storage', () =>{
  let session_id=sessionStorage.getItem("session-id");
  expect(session_id).toBeNull();
})

test('Testing  Username Session Storage after login in', ()=>{
  render(<PatientSearch/>);
  
})