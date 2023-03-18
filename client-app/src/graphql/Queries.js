import { gql } from "@apollo/client";

export const GET_EMPLOYEE = gql`

query getEmployees{
    getEmployees{
        _id
        name
        age
        code
        position
    }
}
`
export const LOGIN = gql`
    query login($email: String, $password: String){
        login(email: $email, password: $password){
            _id
            email
            password
        }
    }
`