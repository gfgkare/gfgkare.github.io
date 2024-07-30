import { useState, useEffect, useRef, Fragment } from "react";
import eventCoverImage from "../assets/events_cover.jpeg";

// -----------------------------------

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import {
    AiOutlineLoading,
    AiOutlineCheck,
    AiFillLinkedin,
    AiFillGithub,
    AiFillInstagram,
} from "react-icons/ai";
import { BiSolidPhoneCall, BiLinkExternal } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";

// -----------------------------------

import { useAuth } from "../contexts/AuthContext";
import { useMisc } from "../contexts/MiscContext";
import { utcToLocalTimeStamp } from "../scripts/Misc";
import Footer from "../components/Footer";
import RollingLetters from "../components/RollingLetters"

import axios from "../scripts/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";

import "../styles/EventRegister.scss";

const env = import.meta.env;

export default function DynamicEventPage() {
    const { USER_PRESENT, currentUser, signinwithpopup } = useAuth();
    const { readableError, setNavTitle } = useMisc();

    const [eventID, setEventID] = useState();
    const [eventRegisterStatus, setEventRegisterStatus] =
        useState("not_registered");
    const [eventRegisteringInProgress, setEventRegisteringInProgress] =
        useState(false);
    const [noOfRegistered, setNoOfRegistered] = useState(0);
    const [eventStart, setEventStart] = useState(0);
    const [maxCount, setMaxCount] = useState(200);
    const [countdownTime, setCountdownTime] = useState(0);
    const [eventRegistrationStatus, setEventRegistrationStatus] = useState("accepting");

    const [modalOpen, setModalOpen] = useState(false);
    const [userDept, setUserDept] = useState("");
    const [fadeStatus, setFadeStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [eventData, setEventData] = useState({});

    const fullName = useRef();
    const regNo = useRef();
    const email = useRef();
    const year = useRef();
    const dept = useRef();
    const otherDept = useRef();
    const slot = useRef();
    const section = useRef();
    const num = useRef();

    const getDateAndTime = (epoch) => {
        epoch = utcToLocalTimeStamp(epoch);
        let date = new Date( epoch );
        let day = date.getDate();
        let month = date.getMonth();
        let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month];
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ampm;
        return `${monthName} ${day} ${year} ${strTime}`;
    }

    const registerForEvent = () => {
        if (!USER_PRESENT()) return;
        setEventRegisteringInProgress(true);

        console.log(otherDept?.current?.value);

        axios
            .post(
                "/register_for_event",
                {
                    userID: currentUser.uid,
                    eventID: eventID,
                    fullName: fullName.current.value,
                    regNo: regNo.current.value,
                    year: year.current.value,
                    email: currentUser.email,
                    dept:
                        dept.current.value !== "OTHER"
                            ? dept.current.value
                            : otherDept?.current?.value,
                    num: num.current.value,
                }
                // { headers: { Authorization: currentUser.getIdToken() } }
            )
            .then((res) => {
                console.log(res);
                setModalOpen(false);
                setNoOfRegistered((noOfRegistered) => noOfRegistered + 1);
                setEventRegisteringInProgress(false);
                setEventRegisterStatus("registered");
                toast.success("You are registered for Algorithmist 2024!");
            })
            .catch((e) => {
                console.warn(e);
                setEventRegisteringInProgress(false);
                toast.error(e.response.data.message);
            });
    };

    useEffect(() => {
        setLoading(true);
        setModalOpen(false);
        window.scrollTo(0, 0);
        let eventID = window.location.pathname.split("/")[2];
        setEventID(eventID);

        console.log(`Width: ${window.innerWidth}px`);

        axios.post("/get_event_details", {
            eventID: window.location.pathname.split("/")[2],
        }, {
            timeout: 10000,
            timeoutErrorMessage: "Server is not responding. Please try again after sometime."
        })
        .then((res) => {
            console.log("Got event details.");
            console.log(res);
            setEventData(res.data.details);
            console.log(utcToLocalTimeStamp(res.data.startsAt));
            setEventStart(utcToLocalTimeStamp(res.data.startsAt));
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            toast.error( err.response.data.message || err.message);
        });
    
        setTimeout(() => {
            setFadeStatus("visible");
        }, 500);

        setNavTitle("");
    }, []);

    useEffect(() => {
        if (modalOpen) {
            window.scrollTo(0, 0);
            document.body.style.overflowY = "hidden";
        } else document.body.style.overflowY = "auto";
        console.log(currentUser);
    }, [modalOpen]);

    useEffect(() => {
        if (eventStart) {
            console.log(
                `Time difference is : ${parseInt(
                    (eventStart - new Date().getTime()) / 1000
                )}`
            );
            setCountdownTime(
                parseInt((eventStart - new Date().getTime()) / 1000)
            );
        }
    }, [eventStart]);

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
        <>
        {
            (loading) ? (
                <RollingLetters word={"GFGKARE"} subText={"loading event..."} />
            ) : (
                <div className={'eventRegister ' + fadeStatus }>
                    <div className="coverImage">
                        <img src={eventCoverImage} alt="event cover image" />
                    </div>
                    <div className="rest">
                        <div className="eventBox">
                            <div className="eventInfoWrapper">
                                <div className="eventInfo">
                                    <div className="eventTitle">
                                        {eventData ? eventData.title : "-"}
                                    </div>

                                    <div className="aboutEvent">
                                        {eventData ? eventData.about.replaceAll("\\n", "\n") : "-"}
                                    </div>

                                    <div className="startsIn">
                                        <div className="title">Registration ends in: </div>
                                        <div className="time">
                                            {(eventData && eventData.startsAt) ? (
                                                <CountdownTimer
                                                    count={parseInt( ( utcToLocalTimeStamp(eventData.startsAt) - new Date().getTime()) / 1000)}
                                                    border
                                                    showTitle
                                                    size={(window.innerWidth > 900) ? 22 : 16}
                                                />
                                            ) : (
                                                <></>
                                            )}
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
                                                (eventRegisterStatus === "registered" || eventRegisteringInProgress === true || eventRegistrationStatus !== "accepting")
                                            }
                                            onClick={() => setModalOpen(true)}
                                        >
                                            { (eventRegistrationStatus !== "accepting") ? "Registration Closed" :
                                            (eventRegisteringInProgress) ? (
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
                                        (eventRegistrationStatus !== "accepting") ? 
                                        (<button className="closed" disabled>Registration Closed</button>)
                                        :
                                        (<button
                                            onClick={() => {
                                                console.log("registering...");
                                                signinwithpopup("google")
                                                .then(() => setModalOpen(true));
                                            }}
                                        >
                                            Sign in to Register
                                        </button>)
                                    )}
                                </div>
                                <div className="row">
                                    <div className="registerPanelItem">
                                        <div className="icon">
                                            <HiUserGroup />
                                        </div>
                                        <div className="info">
                                            <div className="heading">
                                                Limited Registrations
                                            </div>
                                            <div className="content">
                                                {/* {noOfRegistered}/{maxCount} */}
                                                Register now!
                                                {/* {"  ⠀⠀"} */}
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
                                            <div className="content">
                                            {eventData ? eventData.teamSize : "-"}
                                            </div>
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
                                            <div className="content">
                                                {eventData ? getDateAndTime(eventData.startsAt) : "-"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="registerPanelItem">
                                        <div className="icon">
                                            <TfiMoney />
                                        </div>
                                        <div className="info">
                                            <div className="heading">
                                                Entry Fee
                                            </div>
                                            <div className="content">
                                                Free
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <button>Register!</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    
                    <section 
                        className="databaseContent"
                        dangerouslySetInnerHTML={{ __html: eventData?.htmlContent }}
                    />

                    {(eventRegisterStatus !== "registered" && eventRegistrationStatus === "accepting" ) ? (
                        <div className="reminder">
                            <div className="subHeadings">
                                Hurry up and secure your spot before registration closes!
                            </div>
                            <div className="registerBtnContainer">
                                {USER_PRESENT() ? (
                                    eventRegisteringInProgress ? (
                                        <div className="registerBtn">
                                            Registering...
                                        </div>
                                    ) : eventRegisterStatus === "registered" ? (
                                        <div className="registerBtn">
                                            Registered.
                                        </div>
                                    ) : (
                                        <div
                                            className="registerBtn"
                                            onClick={() => setModalOpen(true)}
                                        >
                                            Register!
                                        </div>
                                    )
                                ) : (
                                    <div
                                        className="registerBtn"
                                        onClick={() => signinwithpopup("google")}
                                    >
                                        Sign in to Register
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="contact">
                        <div className="header">
                            For any queries, contact:{" "}
                        </div>
                        <div className="people">
                            {
                                (eventData?.contact) && (
                                    Object.keys(eventData?.contact).map((person) => {
                                        return (
                                            <a href={`tel:${eventData.contact[person]}`}>
                                                {" "}
                                                <span> {person.slice(1)} - {eventData.contact[person]} </span>
                                                <BiSolidPhoneCall />{" "}
                                            </a>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>

                    <Footer />
                </div>
            )
        }

            <div
                className={modalOpen ? "modal open" : "modal"}
                onClick={() => setModalOpen(false)}
            >
                <div
                    className="box"
                    onClick={(e) => {
                        e.bubbles = false;
                        e.stopPropagation();
                    }}
                >
                    <h2>Complete your registration!</h2>
                    <form
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("ref..");
                            registerForEvent();
                        }}
                    >
                        <div className="row">
                            <div className="emailIndication">
                                <img src={currentUser?.photoURL} alt="" />
                                <div
                                    onClick={() => {
                                        setModalOpen(false);
                                        signinwithpopup("google");
                                    }}
                                >
                                    <span className="email">
                                        {currentUser?.email}
                                    </span>
                                    <span>Change email?</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label for="name">Full Name *</label>
                            <input
                                id="name"
                                type="text"
                                required
                                autoComplete="off"
                                ref={fullName}
                                defaultValue={currentUser?.displayName}
                            />
                        </div>
                        <div className="row">
                            <label for="email">Register No *</label>
                            <input
                                id="email"
                                type="number"
                                required
                                autoComplete="off"
                                ref={regNo}
                            />
                        </div>
                        {/* <div className="row">
                            <label for="email">Email Address *</label>
                            <input id="email" type="email" required autoComplete="off" ref={email} />
                        </div> */}
                        <div className="row">
                            <label for="year">Year *</label>
                            <select name="year" ref={year}>
                                <option value="III">III</option>
                                <option value="II">II</option>
                            </select>
                        </div>
                        <div className="row">
                            <label for="department">Department *</label>
                            <select
                                name="department"
                                onChange={(e) =>
                                    setUserDept(e.currentTarget.value)
                                }
                                ref={dept}
                            >
                                <option value="">
                                    Choose your department...
                                </option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="OTHER">Other...</option>
                            </select>
                        </div>
                        {userDept === "OTHER" ? (
                            <div className="row">
                                <label for="department">Department *</label>
                                <input
                                    type="text"
                                    placeholder="Enter your department..."
                                    ref={otherDept}
                                    required
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="row">
                            <label for="num">Contact Number *</label>
                            <input
                                id="num"
                                type="number"
                                required
                                autoComplete="off"
                                ref={num}
                            />
                        </div>
                        <div className="row">
                            <button>
                                {eventRegisteringInProgress
                                    ? "Registering..."
                                    : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
