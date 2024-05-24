
import mongoose from "mongoose";

export const Connection = async (username,password)=>{
    const URL = `mongodb+srv://${username}:${password}@ecommerce-web.pqpdhmb.mongodb.net/?retryWrites=true&w=majority&appName=ECOMMERCE-APP`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology: true},{useNewUrlParser: true});
       console.log("Database Connected Successfully");

    }catch(error){
        console.log("error while connecting to the database",error.message);
    }
}

export default Connection;