import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Scramble from "./components/Scramble.js";

// Styling
import "./styles/app.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
function App() {
  return (
    <div className="p-5">
      <Container className="rounded background-grey p-5 d-flex justify-content-center">
        <Scramble />
      </Container>
    </div>
  );
}

export default App;
