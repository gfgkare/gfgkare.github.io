import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

import { MiscProvider } from "./contexts/MiscContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <MiscProvider>
            <App />
        </MiscProvider>
    //</React.StrictMode>
);
