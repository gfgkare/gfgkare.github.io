import { useState, useEffect } from "react";


import eventCoverImage from "../assets/events_cover.jpeg";

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle, AiOutlineLoading, AiOutlineCheck } from "react-icons/ai";

import { useAuth } from "../contexts/AuthContext"
import { useMisc } from "../contexts/MiscContext";

import axios from "../scripts/axiosConfig";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/EventRegister.scss";

const env = import.meta.env;

export default function EventRegister() {

    const { USER_PRESENT, currentUser, signinwithpopup } = useAuth();
    const { readableError } = useMisc();

    const [eventRegisterStatus, setEventRegisterStatus] = useState("not_registered");
    const [eventRegisteringInProgress, setEventRegisteringInProgress] = useState(false);
    const [noOfRegistered, setNoOfRegistered] =  useState(130)

    const registerForEvent = () => {
        // if (USER_PRESENT()) 
        setEventRegisteringInProgress(true);

        console.log(USER_PRESENT());

        setTimeout(() => {
            // setEventRegisterStatus("registered");
            setNoOfRegistered(noOfRegistered => noOfRegistered + 1);
            setEventRegisteringInProgress(false);
            toast.success("You are registered for Algorithmist 2024 Round 3!");

            axios.post("/register_for_event", { eventID: "algo2024", user: currentUser.uid }, { headers: { Authorization: currentUser.getIdToken() } } )
            .then((res) => console.log(res))
            .catch((e) => console.warn(e))
        }, 1000)
    }

    useEffect(() => {
        window.scrollTo(0,0);


        console.log(env.VITE_AUTHOR)
    }, [])

    useEffect(() => {
        setEventRegisteringInProgress(true);
        if (currentUser && currentUser !== "none") {
            currentUser.getIdToken().then((token) => {
                axios.post("/get_event_reg_status", { userID: currentUser.uid }, { headers: { Authorization: token } } )
                .then((res) => {
                    if (res.data.status == "Registered") setEventRegisterStatus("registered");
                    else setEventRegisterStatus("not_registered");
                })
                .finally(() => setEventRegisteringInProgress(false));
            })
            
        }

    }, [currentUser])

    return (
        
        <div className="eventRegister">
            <div className="coverImage">
                <img src={eventCoverImage} alt="event cover image" />
            </div>
            <div className="rest">
                <div className="eventBox">
                    <div className="eventInfoWrapper">
                        <div className="eventInfo">
                            <div className="eventTitle">
                                Algorithmist 2024 (Round 3)
                            </div>
                            {/* <div className="conductedBy">
                                Brought to you by GeeksForGeeks KARE Student
                                Chapter
                            </div> */}

                            <div className="whereWhenContainer">
                                <div className="where">
                                    <span className="title">
                                        <IoLocationSharp /> Where{" "}
                                    </span>
                                    <div className="content">
                                        <div>8th block Seminar hall</div>
                                        <div>KARE</div>
                                    </div>
                                </div>

                                <div className="when">
                                    <span className="title">
                                        <AiFillClockCircle /> When{" "}
                                    </span>
                                    <div className="content">
                                        <div className="date">
                                            Wednesday, September 20, 2023
                                        </div>
                                        <div className="time">
                                            5:00PM - 6:00 PM GMT+5:30
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="aboutEvent">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Libero temporibus eligendi
                                sint, eum voluptates maiores rem, quod obcaecati
                                atque delectus culpa. Debitis voluptatum iure
                                explicabo in necessitatibus. Repellat, aliquid
                                officia.
                            </div>
                        </div>
                    </div>

                    <div className="eventRegisterPanel">
                        <div className="row registerBtn">
                            {
                                (USER_PRESENT()) ? (
                                <button className={(eventRegisterStatus==="registered" ? "registerDone" : "")} disabled={(eventRegisterStatus === "registered" || eventRegisteringInProgress === true)} onClick={registerForEvent}>
                                    {eventRegisteringInProgress ? (
                                        <AiOutlineLoading className="loadingIcon" size="15px" /> // if in progress, show loading btn
                                    ) : (eventRegisterStatus === "not_registered") ? (     // else, if not registered show reg btn
                                        "Register!"
                                    ) : (                           // else, if registered show regd btn
                                        <>
                                            {" "}
                                            <AiOutlineCheck size="15px" />{" "}
                                            Registered
                                        </>
                                    )}
                                </button>
                                )
                                :
                                (
                                    <button onClick={() => signinwithpopup("google").then(() => {}).catch((e) => toast.error(readableError(e.code)))}>Sign In to Register</button>
                                )
                            }
                            
                        </div>
                        <div className="row">
                            <div className="registerPanelItem">
                                <div className="icon">
                                    <HiUserGroup />
                                </div>
                                <div className="info">
                                    <div className="heading">Registered</div>
                                    <div className="content">{noOfRegistered}/200</div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="registerPanelItem">
                                <div className="icon">
                                    <BsFillPersonFill />
                                </div>
                                <div className="info">
                                    <div className="heading">Team Size</div>
                                    <div className="content">Individual</div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="registerPanelItem">
                                <div className="icon">
                                    <FaCalendarAlt />
                                </div>
                                <div className="info">
                                    <div className="heading">
                                        Registration Deadline
                                    </div>
                                    <div className="content">20th Oct 2023</div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row">
                            <button>Register!</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
