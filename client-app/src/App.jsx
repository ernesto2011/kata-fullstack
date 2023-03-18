import "./App.css";
import Home from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";
import { Login } from "./components/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3001/",
  });

  return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/create-employee" element={<Form/>} />
          <Route index element={ <Login/> } />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
