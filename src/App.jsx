import "./App.css";
import "./styles/Variables.scss";

import Main from "./pages/Main";
import Home from "./views/Home";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

export default function App() {

    useEffect(() => {
        document.body.classList.add("dark");
    })

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main />}>
                        <Route path="/" element={<Home />}></Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}
