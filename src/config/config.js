import dotenv from "dotenv"
dotenv.config()

if(!process.env.PORT){
    throw new Error("port is not declared in the env file")
}

if(!process.env.MONGODB_URI){
    throw new Error('mongo db uri is not declared in env file')
}

export default {
    port : process.env.PORT,
    mongoDBUri: process.env.MONGODB_URI
}