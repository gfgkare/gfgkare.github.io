// import "./App.css";
// import "./styles/Variables.scss";

import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

import Home from "./views/Home";
import CoreTeam from "./views/CoreTeam";
import TeamMember from "./views/TeamMember";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Meta from "./pages/Meta";



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
                        <Route path="/core" element={<CoreTeam />}></Route>
                        <Route path="/core/:membername" element={<TeamMember />}></Route>

                        <Route path="/meta" element={ <Meta /> }></Route>
                    </Route>

                    <Route path="/*" element={ <NotFound /> }></Route>
                </Routes>
            </Router>
        </>
    );
}
