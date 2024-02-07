import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Spinner from "./components/spinner/spinner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
             <App /> 
            
        </BrowserRouter>
    </React.StrictMode>
);
