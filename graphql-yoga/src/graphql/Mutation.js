import Employee from "../models/Employee.js";
import User from "../models/User.js";

const Mutation = {
    async createEmployee(_, {name, age, position, code}){
        const newEmployee = {name, age, position, code};
        const employee = await Employee.create(newEmployee);
        return await Employee.find()
    },
    async createUser(_,{email, password}) {
        const newUser = {email, password};
        const user = await User.create(newUser);
        return await user

    },

    async updateEmployee(_, {_id, name, age, position, code}){
        const employee = {name, age, position, code};
        return await Employee.findByIdAndUpdate(_id, employee,{new: true})
    },
    async deleteEmployee(_,{_id}){
        await Employee.findByIdAndDelete( _id );
        return await Employee.find();
    }
}

export default Mutation;