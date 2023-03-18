import Employee from "../models/Employee.js";
import User from "../models/User.js";

const Query = {
    async getEmployees(){
        const employees = await Employee.find();
        return employees
    },
    async getEmployeeByName(_,{name}){
        const find = await Employee.findOne({name})
        return find
    },

    //Querys from users
    async getUsers(){
        const users = await User.find();
        return users
    },
    async login(_,{email, password}){
        const verifyUser = await User.findOne({email, password});
        console.log(verifyUser);
        return verifyUser
        
    }
}

export default Query