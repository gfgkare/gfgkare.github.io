import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./DarkLight.scss";
import "./GlobalStyles.scss";

import { MiscProvider } from "./contexts/MiscContext.jsx";

import { BrowserRouter } from "react-router-dom" 

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <MiscProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MiscProvider>
    //</React.StrictMode>
);
