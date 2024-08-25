import { useState, useEffect, useRef } from "react";

import eventCoverImage from "../../assets/events_cover.jpeg";
import {Link, useNavigate} from "react-router-dom"
// -----------------------------------

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";
import { BiSolidPhoneCall, BiLinkExternal } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";

// -----------------------------------
import CLink from "../../components/CLink";
import { useAuth } from "../../contexts/AuthContext";
import { useMisc } from "../../contexts/MiscContext";
import { utcToLocalTimeStamp } from "../../scripts/Misc";
import Footer from "../../components/Footer";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import { AttentionSeeker } from "react-awesome-reveal";

import "../../styles/EventRegister.scss";

const env = import.meta.env;

const aboutEvent = `GFG KARE Student Chapter is and always will be a group of talented, dedicated and like-minded people working together.
We are constantly looking for passionate students who are willing to learn and grow together 🤝 
🔥 Enthusiasm is all it is needed for joining our community. The enrolled members will get internship opportunities, continuous guidance learning materials, and resources for the domains mentioned below.

Register now to be a part of this amazing community and make the most out of it! 🚀`;

export default function StudentEnrollment() {
    const { USER_PRESENT, currentUser, signinwithpopup } = useAuth();
    const { readableError, setNavTitle } = useMisc();
    const [fadeStatus, setFadeStatus] = useState("");
    const [countdownTime, setCountdownTime] = useState(500);
    const [eventRegistrationStatus, setEventRegistrationStatus] = useState("accepting");
    const [eventRegisterStatus, setEventRegisterStatus] = useState("not_registered");
    const [eventRegisteringInProgress, setEventRegisteringInProcess] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeStatus("visible"), 500);
    }, [])

    const navigate = useNavigate()

    const handleMember = () => {
        // Specify the URL you want to navigate to
        const url = 'https://gfgkare.vercel.app/form';
        
        // Redirect the browser to the specified URL
        window.location.href = url;
    };

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
                                    Student Enrollment 24-25
                                    <span><GrAnnounce className="green" /> GFG KARE STUDENT CHAPTER</span>
                                </div>

                                <div className="aboutEvent">
                                    {aboutEvent}
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
                                {USER_PRESENT() ? (
                                    <AttentionSeeker effect="tada" delay={5000}>
                                        <CLink to="https://gfgkare.vercel.app/form">
                                            <button
                                                className={
                                                    eventRegisterStatus === "registered"
                                                        ? "registerDone"
                                                        : ""
                                                }
                                                disabled={
                                                    (eventRegisterStatus === "registered" || eventRegisteringInProgress === true || eventRegistrationStatus !== "accepting")
                                                }

                                                onClick={handleMember}

                                            > Become a Member
                                            </button>
                                        </CLink>
                                        
                                    </AttentionSeeker>
                                    
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
                                        <FaCalendarAlt />
                                    </div>
                                    <div className="info">
                                        <div className="heading">
                                            Registration Deadline
                                        </div>
                                        <div className="content">
                                            29th Aug 2024, 3PM
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
                                            Member Fee
                                        </div>
                                        <div className="content">
                                            Free
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="headings">BENEFITS</div>

                <div className="memberBenefits">
                    <div className="benefitsContainer">
                        <div className="row">
                            <div className="title">Internship Opportunities at GeeksForGeeks</div>
                            <div className="content">
                                Get a chance to intern at GeeksForGeeks and learn from the best in the industry.
                                4 student members have got internship opportunities at GeeksForGeeks in the past year alone.
                            </div>
                        </div>

                        <div className="row">
                            <div className="title">Become Domain Leads</div>
                            <div className="content">
                                Get a chance to become domain leads and lead the student community in the domain of your interest.
                            </div>
                        </div>
                        

                        <div className="row">
                            <div className="title">Free Guidance and Mentoring</div>
                            <div className="content">
                                Get free guidance and mentoring from the experienced members of the community.
                                Get help in your projects, assignments and career guidance.
                            </div>
                        </div>

                        <div className="row">
                            <div className="title">Boost Technical Skills</div>
                            <div className="content">
                                Get access to free webinars, workshops and resources to boost your technical skills.
                            </div>
                        </div>
                    </div>
                </div>

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
                                        <div className="registerBtn" onClick={handleMember}>
                                            Become a member!
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

                <Footer />
            </div>

        </>
    );
}
