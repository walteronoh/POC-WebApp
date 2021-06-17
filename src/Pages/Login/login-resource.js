import axios from 'axios';

const url = "http://10.50.80.115:8090/amrs/ws/rest/v1/";
async function getUser(user, pass) {
  const token = btoa(`${user}:${pass}`);
  try{
    const result=await axios.get(`${url}session`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    return result;
  }catch(error){
    console.log(error)
  }
}
export default getUser;