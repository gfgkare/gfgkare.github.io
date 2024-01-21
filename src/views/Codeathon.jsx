import { useState, useEffect, useRef } from "react";

import eventCoverImage from "../assets/events_cover.jpeg";
import quiz from "../assets/quiz.avif";
import seminar from "../assets/seminar.avif";
import qna from "../assets/qna.avif";
import debug from "../assets/debug.jpg";
import coding from "../assets/coding.png";

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
    AiOutlineWhatsApp
} from "react-icons/ai";
import { BiSolidPhoneCall, BiLinkExternal } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";

// -----------------------------------

import { useAuth } from "../contexts/AuthContext";
import { useMisc } from "../contexts/MiscContext";
import { utcToLocalTimeStamp } from "../scripts/Misc";

import axios from "../scripts/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";

import "../styles/EventRegister.scss";

const env = import.meta.env;

export default function EventRegister() {
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

    const fullName = useRef();
    const regNo = useRef();
    const email = useRef();
    const year = useRef();
    const dept = useRef();
    const otherDept = useRef();
    const slot = useRef();
    const section = useRef();
    const num = useRef();

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
        window.scrollTo(0, 0);
        setEventID(window.location.pathname.split("/")[2]);

        console.log(`Width: ${window.innerWidth}px`);

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


    return (
        <>
            <div className={"eventRegister " + fadeStatus }>
                <div className="coverImage">
                    <img src={eventCoverImage} alt="event cover image" />
                </div>
                <div className="rest">
                    <div className="eventBox">
                        <div className="eventInfoWrapper">
                            <div className="eventInfo">
                                <div className="eventTitle">
                                    Codeathon - Euphoria'24
                                </div>

                                <div className="aboutEvent">
                                    Codeathon is a coding
                                    event organized by the GFG KARE Student
                                    Chapter. The competition comprises two
                                    rounds. More details will be updated soon!

                                    <strong> Cash prizes are provided for the top three!</strong>
                                </div>

                                {/* <div className="startsIn">
                                    <div className="title">Registration ends in: </div>
                                    <div className="time">
                                        {countdownTime ? (
                                            <CountdownTimer
                                                count={countdownTime}
                                                border
                                                showTitle
                                                size={(window.innerWidth > 900) ? 22 : 16}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="eventRegisterPanel">
                            <div className="row registerBtn">
                                {/* {USER_PRESENT() ? (
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
                                            signinwithpopup("google");
                                        }}
                                    >
                                        Sign in to Register
                                    </button>)
                                )} */}
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
                                            Opening soon
                                            {/* {"  ⠀⠀"} */}
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
                                            Event Date
                                        </div>
                                        <div className="content">
                                            26th Mar 2024
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
                                            Individual
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

                <div className="headings">ROUND DETAILS</div>

                <div className="eventDetails">
                    <div className="allRounds">
                        <div className="round">
                            <div className="icon">
                                {/* <img src={quiz} alt="Round 1 Quiz" /> */}
                                <span className="number">1</span>
                            </div>
                            <div className="info">
                                <div className="noAndName">
                                    {/* <div className="roundNo">Round 1</div> */}
                                    <div className="roundName">MCQs</div>
                                </div>
                                
                                <div className="roundDesc">
	    			    Details will be updated soon.
                                </div>
                            </div>
                        </div>
                        {/* <BsArrowDown size={"60px"} /> */}
                        <div className="round">
                            <div className="icon">
                                {/* <img src={seminar} alt="Round 2 Seminar" /> */}
                                <span className="number">2</span>
                            </div>
                            <div className="info">
                                <div className="noAndName">
                                    {/* <div className="roundNo">Round 2</div> */}
                                    <div className="roundName">Coding</div>
                                </div>
                                
                                <div className="roundDesc">
	    			   Details will be updated soon.
                                </div>
                            </div>
                        </div>
                        {/* <BsArrowDown size={"60px"} /> */}
                    </div>

                </div>

                <div className="contact">
                    <div className="header">
                        For any queries, please contact:{" "}
                    </div>
                    <div className="people">
                        <a href="tel:+91 9515822637">
                            {" "}
                            <span> Ashok Reddy Cheluri - 95158 22637 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 9676215354">
                            {" "}
                            <span> Krishna Vineeth - 96762 15354 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 83417 52279">
                            {" "}
                            <span> Parimal Sesha Sai - 83417 52279 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 8754605197">
                            {" "}
                            <span> Sabari - 87546 05197 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                    </div>
                    <br /><br /><br />
                    This site is under development, more details will be updated soon.
                </div>

                <div className="connect">
                    <div className="chapterName">
                        <div className="gfgkare">
                            {["G", "F", "G", "   ", "K", "A", "R", "E"].map(
                                (letter) => (
                                    <div>{letter}</div>
                                )
                            )}
                        </div>
                        <div className="sc">
                            {[
                                "S",
                                "T",
                                "U",
                                "D",
                                "E",
                                "N",
                                "T",
                                " ",
                                "C",
                                "H",
                                "A",
                                "P",
                                "T",
                                "E",
                                "R",
                            ].map((letter) => (
                                <div>{letter}</div>
                            ))}
                        </div>
                    </div>

                    <div className="links">
                        <div className="header">CONNECT WITH US</div>
                        <div className="icons">
                            <a href="https://www.instagram.com/gfgkare">
                                <AiFillInstagram size={"30px"} />
                            </a>
                            <a href="https://www.linkedin.com/company/gfg-kare-student-chapter" target="_blank">
                                <AiFillLinkedin size={"30px"} />
                            </a>
                            <a href="https://www.github.com/gfgkare" target="_blank">
                                <AiFillGithub size={"30px"} />
                            </a>
                            {/* <a href="https://www." target="_blank">
                                <AiOutlineWhatsApp size={"30px"} />
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>

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
                    <h2>Complete your registration</h2>
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
