import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        Require: true
    },
    password:{
        type:String,
        Require: true
    }
})

export default model('User', userSchema);