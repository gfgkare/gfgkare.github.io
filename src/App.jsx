// import "./App.css";
// import "./styles/Variables.scss";

import Main from "./pages/Main";
import UnderConstruction from "./pages/UnderConstruction";
import NotFound from "./pages/NotFound";
import Meta from "./pages/Meta";


import Home from "./views/Home";
import CoreTeam from "./views/CoreTeam";
import TeamMember from "./views/TeamMember";
import ChapterMember from "./views/ChapterMember";

import coreTeamMembers from "./data/coreTeamInfo";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useEffect } from "react";



export default function App() {

    useEffect(() => {
        document.body.classList.add("dark");
    })

    return (
        <>
            <Router>
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes>
                        <Route path="/" element={<Main />}>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/core" element={<CoreTeam />}></Route>
                            {/* <Route path="/core/:membername" element={<TeamMember />}></Route> */}
                            {
                                Object.keys(coreTeamMembers).map((key) => {
                                    return ( <Route path={`/core/${key}`} element={ <TeamMember info={coreTeamMembers[key]} /> } /> )
                                })
                            }
                            <Route path="/chapter/:membername" element={<ChapterMember />}></Route>
                            <Route path="/events/:eventname" element={<UnderConstruction />}></Route>
    
                            <Route path="/meta" element={ <Meta /> }></Route>
                        </Route>

                        <Route path="/*" element={ <NotFound /> }></Route>
                    </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </Router>
        </>
    );
}
