import mongoose from "mongoose";
import config from "../config/config.js";
import { DB_Name } from "../name.js";

async function  connect()  {
    try {
        const connectDB = await mongoose.connect(`${config.mongoDBUri}/${DB_Name}`)
        console.log("MongoDB is connected successfully : ",connectDB.connection.host)
    } catch (error) {
        console.log("error while connecting the mongoDB", error.message)
        
    }

}
export default connect