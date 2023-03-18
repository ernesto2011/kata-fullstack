import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect("mongodb+srv://neto12:passadmin01@clusterdevf-pruebas.rjm4to2.mongodb.net/graphql?retryWrites=true&w=majority",{
            useNewUrlParser: true
        })
        console.log("Database connected");
    }catch(error){
        return console.log("Something went wrong!!", error);
    }
    
}