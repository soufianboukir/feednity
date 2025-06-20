import mongoose from "mongoose";

const dbUrl = process.env.DB_URL || '';

export const dbConnection = async () =>{
    try{
        await mongoose.connect(dbUrl)
    }catch{
        console.log('failed to connect to db');
    }
}