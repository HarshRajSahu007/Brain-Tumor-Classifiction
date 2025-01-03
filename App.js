import React from "react";
import Prediction from "./Prediction";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log(apiBaseUrl); // Should print http://127.0.0.1:8000

function App() {
  return (
    <div className="App">
      <Prediction />
    </div>
  );
}

export default App;


