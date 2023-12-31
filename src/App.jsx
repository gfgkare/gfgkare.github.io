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
import AllMembers from "./views/AllMembers";
import New from "./views/New";
import EventRegister from "./views/EventRegister";
import Login from "./views/Login";
import Profile from "./views/Profile";

import { Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useEffect } from "react";

import allData from "./data/all_data_merged"
import coreTeamMembers from "./data/coreTeamInfo";
import EventStatDashboard from "./views/EventStatDashboard";
import Dashboard from "./views/Dashboard";
import Overview from "./views/Overview";
import Rounds from "./views/Rounds";
import DashboardError from "./views/DashboardError";
import DashboardResults from "./views/DashboardResults";

import Pickle from "./views/Pickle";



export default function App() {

    // const location =

    useEffect(() => {
        document.body.classList.add("light");
    })

    return (
        <>
            {/* <Router> */}
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes>
                        <Route path="/" element={<Main />}>
                            {/* <Route path="/" element={<Home />}></Route> */}
                            {/* <Route path="/login" element={ <Login /> }></Route> */}
                            <Route path="/profile" element={ <Profile /> }></Route>
                            <Route path="/new" element={<New />}></Route>
                            {/* <Route path="/core" element={<CoreTeam />}></Route> */}
                            <Route path="/members" element={<AllMembers />}></Route>
                            {/* <Route path="/events" element={<UnderConstruction />}></Route> */}
                            <Route path="/events/algo2024" element={<EventRegister />}></Route>
                            {
                                Object.keys(coreTeamMembers).map((key, index) => {
                                    return ( <Route key={index} path={`/core/${key}`} element={ <TeamMember info={coreTeamMembers[key]} /> } /> )
                                })
                            }
                            {/*                             
                                {
                                    Object.keys(chapterMembersInfo).map((key) => {
                                        return ( <Route path={`/members/${key}`} element={ <ChapterMember info={{ id: key, ...chapterMembersInfo[key]}} /> } /> )
                                })
                            } */}

                            {
                                allData.map((memberData, index) => {
                                    return ( <Route key={index} path={`members/${memberData["Membership ID"]}`} element={ <ChapterMember info={{ ...memberData }}  /> } /> )
                                })
                            }

                            <Route path="/events/:eventname" element={<UnderConstruction />}></Route>
    
                            <Route path="/meta" element={ <Meta /> }></Route>
                        </Route>
                        {/* <Route path="/ndashboard" element={<EventStatDashboard />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route path="/dashboard" element={ <Overview /> }></Route>
                            <Route path="/dashboard/rounds" element={ <Rounds /> }></Route>
                            <Route path="/dashboard/results" element={ <DashboardResults /> }></Route>
                            <Route path="/dashboard/error" element={ <DashboardError /> }></Route>
                        </Route> */}
                        <Route path="/dashboard" element={ <Pickle /> }></Route>

                        <Route path="/*" element={ <NotFound /> }></Route>
                    </Routes>
                    </CSSTransition>
                </TransitionGroup>
            {/* </Router> */}
        </>
    );
}
