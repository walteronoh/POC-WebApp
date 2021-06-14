import axios from 'axios';

const url="http://10.50.80.115:8090/amrs/ws/rest/v1/";
function GetUser(user,pass){
    const token=btoa(`${user}:${pass}`);
    return axios.get(`${url}session`,{headers:{
        Authorization:`Basic ${token}`
      }}).then(resp=>{
        let response= resp.data;
        return response;
      }).catch(error=>{
        console.log(error.message)
      }) 
}
export default GetUser;