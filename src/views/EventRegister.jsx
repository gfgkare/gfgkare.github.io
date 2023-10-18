import {useState} from "react";


import eventCoverImage from "../assets/events_cover.jpeg";

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle, AiOutlineLoading, AiOutlineCheck } from "react-icons/ai";

import "../styles/EventRegister.scss";

export default function EventRegister() {

    const [eventRegisterStatus, setEventRegisterStatus] = useState("not_registered");
    const [eventRegisteringInProgress, setEventRegisteringInProgress] = useState(false);
    const [noOfRegistered, setNoOfRegistered] =  useState(130)

    const registerForEvent = () => {
        setEventRegisteringInProgress(true);

        setTimeout(() => {
            setEventRegisterStatus("registered");
            setNoOfRegistered(noOfRegistered => noOfRegistered + 1);
            setEventRegisteringInProgress(false);
        }, 1000)
    }

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
                            <button className={(eventRegisterStatus ? " registerDone" : "")} disabled={(eventRegisterStatus === "registered")} onClick={registerForEvent}>
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
