import mongoose from "mongoose";

const userCollection = 'usuarios' 

const userSchema = new mongoose.Schema({
    firt_name: String,
    last_name: String,
    email:{
        type:String,
        unique: true
    }
})

export const userModel = mogoose.model(userCollection,userSchema)