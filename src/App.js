import React from "react";
import { Router } from "./routes/index.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
   
        <ToastContainer autoClose={3000} />
        <Router />

    </>
  );
}

export default App;