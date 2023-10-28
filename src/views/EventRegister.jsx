import { useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";

import eventCoverImage from "../assets/events_cover.jpeg";

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import {
    AiFillClockCircle,
    AiOutlineLoading,
    AiOutlineCheck,
} from "react-icons/ai";

import { useAuth } from "../contexts/AuthContext";
import { useMisc } from "../contexts/MiscContext";
import { utcToLocalTimeStamp } from "../scripts/Misc";

import axios from "../scripts/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css"


import "../styles/EventRegister.scss";

const env = import.meta.env;

export default function EventRegister() {
    const { USER_PRESENT, currentUser, signinwithpopup } = useAuth();
    const { readableError } = useMisc();

    const [eventID, setEventID] = useState();
    const [eventRegisterStatus, setEventRegisterStatus] =
        useState("not_registered");
    const [eventRegisteringInProgress, setEventRegisteringInProgress] =
        useState(false);
    const [noOfRegistered, setNoOfRegistered] = useState(0);
    const [eventStart, setEventStart] = useState(0);
    const [ countdownTime, setCountdownTime] = useState(0);


    const registerForEvent = () => {
        // if (USER_PRESENT())
        setEventRegisteringInProgress(true);

        console.log(USER_PRESENT());

        axios
            .post(
                "/register_for_event",
                { eventID: eventID, userID: currentUser.uid },
                { headers: { Authorization: currentUser.getIdToken() } }
            )
            .then((res) => {
                console.log(res);
                setNoOfRegistered((noOfRegistered) => noOfRegistered + 1);
                setEventRegisteringInProgress(false);
                setEventRegisterStatus("registered");
                toast.success(
                    "You are registered for Algorithmist 2024 Round 3!"
                );
            })
            .catch((e) => {
                console.warn(e);
                setEventRegisteringInProgress(false);
                toast.error(e.response.data.message);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setEventID(window.location.pathname.split("/")[2]);

        axios
            .post("/get_event_reg_count", {
                eventID: window.location.pathname.split("/")[2],
            })
            .then((res) => {
                console.log(res.data.count);
                setNoOfRegistered(res.data.count);
            });

        axios
            .post("/get_event_start_time", {
                eventID: window.location.pathname.split("/")[2],
            })
            .then((res) => {
                console.log("setting start time");
                console.log(utcToLocalTimeStamp(res.data.time));
                setEventStart(utcToLocalTimeStamp(res.data.time));
            });
        console.log(env.VITE_AUTHOR);
    }, []);

    useEffect(() => {
        if (eventStart) {
            console.log(`Time difference is : ${  parseInt((eventStart - new Date().getTime()) / 1000)}`)
            setCountdownTime( parseInt((eventStart - new Date().getTime()) / 1000)  );
        }
    }, [eventStart])

    useEffect(() => {
        setEventRegisteringInProgress(true);
        if (currentUser && currentUser !== "none") {
            currentUser.getIdToken().then((token) => {
                axios
                    .post(
                        "/get_event_reg_status",
                        { userID: currentUser.uid, eventID: eventID },
                        { headers: { Authorization: token } }
                    )
                    .then((res) => {
                        if (res.data.status == "Registered")
                            setEventRegisterStatus("registered");
                        else setEventRegisterStatus("not_registered");
                    })
                    .finally(() => setEventRegisteringInProgress(false));
            });
        }
    }, [currentUser]);

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
                                            Monday, October 30, 2023
                                        </div>
                                        <div className="time">
                                            10:00AM - 12:00PM GMT+5:30
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

                            <div className="startsIn">
                                <div className="title" >Contest Starts in: </div>
                                {/* <div><span className="time">00</span> Days  <span className="time">00</span> Hours <span className="time">00</span> Minutes <span className="time">00</span> Seconds</div> */}
                                <div className="time">
                                    {
                                        (countdownTime) ? <CountdownTimer count={countdownTime} border showTitle size={22} /> : <></>
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="eventRegisterPanel">
                        <div className="row registerBtn">
                            {USER_PRESENT() ? (
                                <button
                                    className={
                                        eventRegisterStatus === "registered"
                                            ? "registerDone"
                                            : ""
                                    }
                                    disabled={
                                        eventRegisterStatus === "registered" ||
                                        eventRegisteringInProgress === true
                                    }
                                    onClick={registerForEvent}
                                >
                                    {eventRegisteringInProgress ? (
                                        <AiOutlineLoading
                                            className="loadingIcon"
                                            size="15px"
                                        /> // if in progress, show loading btn
                                    ) : eventRegisterStatus ===
                                      "not_registered" ? ( // else, if not registered show reg btn
                                        "Register!"
                                    ) : (
                                        // else, if registered show regd btn
                                        <>
                                            {" "}
                                            <AiOutlineCheck size="15px" />{" "}
                                            Registered
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        signinwithpopup("google")
                                            .then(() => {})
                                            .catch((e) =>
                                                toast.error(
                                                    readableError(e.code)
                                                )
                                            )
                                    }
                                >
                                    Sign In to Register
                                </button>
                            )}
                        </div>
                        <div className="row">
                            <div className="registerPanelItem">
                                <div className="icon">
                                    <HiUserGroup />
                                </div>
                                <div className="info">
                                    <div className="heading">Registered</div>
                                    <div className="content">
                                        {noOfRegistered}/200
                                    </div>
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
                                    <div className="content">29th Oct 2023 - 5PM</div>
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
