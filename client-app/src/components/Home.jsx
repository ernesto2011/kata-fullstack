import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEE } from "../graphql/Queries";
import { REMOVE_EMPLOYEE } from "../graphql/Mutation";
import { Link } from "react-router-dom";
import { userState } from "../config/UserState";

const Home = () => {
  const verifySession = userState((state)=> state.session)
  console.log(verifySession);
  const [searchEmployee, { data, error }] = useLazyQuery(GET_EMPLOYEE);
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE, {
    //ejecuta el query despues de eliminar el empleado de la base de datos
    refetchQueries: [{ query: GET_EMPLOYEE }],
  });

  useEffect(() => {
    searchEmployee();
  }, []);

  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="flex gap-10 pt-4">
      {data &&
        data.getEmployees.map(({ _id, name, age, position, code }) => (
          <>
          <Link
          to="/create-employee"
          state={{ _id, name, age, code, position }}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={_id}
          >
            <a href="#">
              <img
                className="rounded-t-lg"
                src="https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg?w=2000"
                alt="image"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Position: {position}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Edad: {age}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Codigo: {code}
              </p>
            </div>
            
          </Link>
          <div>
          <button
              onClick={async (e) => {
                await removeEmployee({
                  variables: { _id },
                });
              }}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
          </>
        ))}
    </div>
  );
};

export default Home;
