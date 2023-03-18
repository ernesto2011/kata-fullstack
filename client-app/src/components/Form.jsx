import { useMutation } from "@apollo/client";
import React,{useState, useEffect} from "react";
import { CREATE_EMPLOYEE } from "../graphql/Mutation";
import { UPDATE_EMPLOYEE } from "../graphql/Mutation";
import { useLocation, useNavigate } from "react-router-dom";

export const Form = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('employee info', location.state);

    /* Variables globales*/
    const [name, setName]= useState("");
    const [age, setAge] = useState("");
    const [position, setPosition] = useState("");
    const [code, setCode] = useState("");
    const [_id, setId] =useState("")
    /* Variables globales*/


    /*varialbles de estado uselocation */
    const currentState = location.state
    const employeeId = currentState && currentState !== undefined ? currentState._id : _id;
    const employeeName = currentState && currentState !== undefined ? currentState.name : name;
    const employeeAge = currentState && currentState !== undefined ? currentState.age : age;
    const employeePosition = currentState && currentState !== undefined ? currentState.position : position;
    const employeeCode = currentState && currentState !== undefined ? currentState.code : code;
    /*varialbles de estado uselocation */

    /* Area de mutaciones */
    const [createEmployee] =useMutation(CREATE_EMPLOYEE, {});
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {});
    /* Area de mutaciones */

    useEffect(()=>{
      if(currentState){
        setId(employeeId)
        setName(employeeName)
        setAge(employeeAge)
        setPosition(employeePosition)
        setCode(employeeCode)
      }
    },[])
  return (
    <form onSubmit={async (event) =>{
        event.preventDefault()

        if (currentState) {
          await updateEmployee({
            variables:{_id, name, age, position, code}
          })
        } else {
          //llamar al mutation para crear el employee
          await createEmployee({
            variables:{name, age, position, code}
          })
        }
        //redirigir al usuario hacia /home
        navigate('/home')
    }}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          type="text"
          onChange={(event)=>{
            let getName =  event.target.value
            setName(getName)
          }}
          id="name"
          value={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Age
        </label>
        <input
          type="number"
          onChange={(event)=>{
            let getAge =  event.target.value
            setAge(getAge)
          }}
          id="age"
          value={age}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Position
        </label>
        <input
          type="text"
          onChange={(event)=>{
            let getPosition =  event.target.value
            setPosition(getPosition)
          }}
          id="position"
          value={position}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Code
        </label>
        <input
          type="text"
          onChange={(event)=>{
            let getCode=  event.target.value
            setCode(getCode)
          }}
          id="code"
          value={code}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {currentState ? "Update employee" :"Create employee"}
  
      </button>
    </form>
  );
};
