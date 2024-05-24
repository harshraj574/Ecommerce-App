import axios from 'axios';

const URL = 'http://localhost:8000';

export const authenticateSingup = async (data)=>{
    try{
     return await  axios.post(`${URL}/signup`,data);

    } catch(err){
        console.log("error while calling singup api",err);

    } 
}

export const authenticateLogin = async (data)=>{
    try{
     return await  axios.post(`${URL}/login`,data);

    } catch(err){
        console.log("error while calling login api",err);

    } 
 
}

export const payUsingPaytm = async (data) =>{
    try{
      let response = await axios.post(`${URL}/payment`,data);
      return response.data;

    }catch(err){
        console.log("Errr while calling payment api",err);

    }
}