import React from "react";
import { render, hydrate } from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./DarkLight.scss";
import "./GlobalStyles.scss";

import { MiscProvider } from "./contexts/MiscContext.jsx";

import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    hydrate(
        <MiscProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MiscProvider>,
        rootElement
    );
} else {
    render(
        <MiscProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MiscProvider>,
        rootElement
    );
}

// ReactDOM.createRoot(document.getElementById("root")).render(
//     // <React.StrictMode>
//     <MiscProvider>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </MiscProvider>
//     //</React.StrictMode>
// );
