// import "./App.css";
// import "./styles/Variables.scss";

import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Meta from "./pages/Meta";
import Student_enroll_form from "./views/HardcodedEventPages/Student_enroll_form";
import Home from "./views/Home";
import CoreTeam from "./views/CoreTeam";
import TeamMember from "./views/TeamMember";
import ChapterMember from "./views/ChapterMember";
import AllMembers from "./views/AllMembers";
import New from "./views/New";
import EventRegister from "./views/EventRegister";
// import NewEventRegister from "./views/NewEventRegister";
import DynamicEventPage from "./views/DynamicEventPage";
import Round5Register from "./views/HardcodedEventPages/RoadToMernRegister";
import Codeathon from "./views/Codeathon";
import Login from "./views/Login";
import Profile from "./views/Profile";
import "./App.css"


import { Routes, Route, Navigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useEffect } from "react";

import allData from "./data/all_data_merged"
import coreTeamMembers from "./data/coreTeamInfo";
import Dashboard from "./views/Dashboard";
import Rounds from "./views/Rounds";
import DashboardError from "./views/DashboardError";
import DashboardResults from "./views/DashboardResults";

import CodeClash from "./views/HardcodedEventPages/CodeClash";

import CodeHouse from "./views/CodeHouse";
import Code from "./views/Code";

import ProjectExpo from "./views/HardcodedEventPages/Prajnotsavah/ProjectExpo";
import ProjectExpoRegister from "./views/HardcodedEventPages/Prajnotsavah/ProjectExpoRegistration";
import StudentEnrollment from "./views/HardcodedEventPages/StudentEnrollment24-25"; 
import Landing from "./views/Landing";
import Pickle from "./views/Pickle";
import { ToastContainer } from "react-toastify";
import ProjectExpoRegistrationSuccess from "./views/HardcodedEventPages/Prajnotsavah/ProjectExpoRegistrationSuccess";
import GeekfestResults from "./views/GeekfestResults";
import CertificateViewer from "./views/CertificateViewer";
import EventTemplate from "./views/Event Pages/EventTemplate";
import Contact from "./views/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";


export default function App() {

    // const location =

    useEffect(() => {
        document.body.classList.add("light");
    })

    return (
        <>
            <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />

            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes>
                        <Route path="/" element={<Main />}>
                            <Route path="/" element={<Navigate to="/hero" />}></Route>
                            <Route path="/profile" element={ <Profile /> }></Route>
                            <Route path="/new" element={<New />}></Route>
                            {/* <Route path="/core" element={<CoreTeam />}></Route> */}
                            <Route path="/members" element={<AllMembers />}></Route>
                            {/* <Route path="/events" element={<UnderConstruction />}></Route> */}
                            <Route path="/events" element={<EventTemplate />}></Route>
                            <Route path="/contact" element={<Contact />}></Route>
                            <Route path="/algo2025" element={<EventRegister />}></Route>
                            <Route path="/Algorithmist25" element={<EventRegister />}></Route>


                            {
                                Object.keys(coreTeamMembers).map((key, index) => {
                                    return ( <Route key={index} path={`/core/${key}`} element={ <TeamMember info={coreTeamMembers[key]} /> } /> )
                                })
                            }
                            {
                                allData.map((memberData, index) => {
                                    return ( <Route key={index} path={`members/${memberData["Membership ID"]}`} element={ <ChapterMember info={{ ...memberData }}  /> } /> )
                                })
                            }

                            <Route path="/events/:eventname" element={<DynamicEventPage />}></Route>
    
                            <Route path="/meta" element={ <Meta /> }></Route>
                        </Route>

                        <Route path="/hero" element={<Landing />}></Route>
       
                        {/* EVENTS */}
                        {/* <Route path="/events/project-expo/register" element={ <ProjectExpoRegister /> }></Route> */}
                        {/* <Route path="/events/prajnotsavah/register" element={ <ProjectExpoRegister /> }></Route> */}

                        <Route path="/geekfest24/results" element={ <GeekfestResults /> }></Route>

                        <Route path="/certificates/:eventName/:certificateID" element={<CertificateViewer />}></Route>
                        
                        {/* PAST EVENTS */}
                        {/* <Route path="/events/codeathon" element={<NewEventRegister />}></Route> */}
                        {/* <Route path="/roadmap-to-mern-stack" element={<Round5Register />}></Route> */}
                        {/* <Route path="/co/decraft" element={<CodeClash />}></Route> */}
                        {/* <Route path="/enrollment" element={ <StudentEnrollment /> }></Route> */}
                        {/* <Route path="/enrollment/form" element={<Student_enroll_form />}></Route> */}
                        {/* <Route path="/events/project-expo" element={ <ProjectExpo /> }></Route> */}
                        <Route path="/events/prajnotsavah" element={ <ProjectExpo /> }></Route>
                        {/* <Route path="/events/prajnotsavah/success" element={ <ProjectExpoRegistrationSuccess /> }></Route> */}



                        {/* DASHBOARD */}
                        <Route path="/dashboard" element={<Dashboard />}>
                            {/* <Route path="/dashboard" element={ <Overview /> }></Route> */}
                            <Route path="/dashboard/rounds" element={ <Rounds /> }></Route>
                            <Route path="/dashboard/results" element={ <DashboardResults /> }></Route>
                            <Route path="/dashboard/error" element={ <DashboardError /> }></Route>
                        </Route>

                        <Route path="/:eventname/code" element={<CodeHouse />}>
                            <Route path="/:eventname/code" element={<Code />}></Route>
                        </Route>
                        
                        <Route path="/terms" element={ <Terms /> }></Route>
                        <Route path="/privacy" element={ <Privacy /> }></Route>
                        <Route path="/refund" element={ <Refund /> }></Route>

                        <Route path="/*" element={ <NotFound /> }></Route>
                    </Routes>
                    </CSSTransition>
                </TransitionGroup>
        </>
    );
}
