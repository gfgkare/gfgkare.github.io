// import "./App.css";
import "./styles/Variables.scss";

import Main from "./pages/Main";
import Home from "./views/Home";

import NotFound from "./pages/NotFound";


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
                    <Route path="/" element={<Main />}>
                        <Route path="/" element={<Home />}></Route>
                    </Route>

                    <Route path="/*" element={ <NotFound /> }></Route>
                </Routes>
            </Router>
        </>
    );
}
