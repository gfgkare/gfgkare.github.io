import { useState, useEffect, useRef } from "react";

import eventCoverImage from "../assets/events_cover.jpeg";

// -----------------------------------

import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLoading, AiOutlineCheck } from "react-icons/ai";
import { BiSolidPhoneCall, BiLinkExternal } from "react-icons/bi";
import { CiCircleInfo, CiWarning } from "react-icons/ci";
import { PiSparkleThin } from "react-icons/pi";
import { FiLoader } from "react-icons/fi";

import { TfiMoney } from "react-icons/tfi";
import upiQR from "./HardcodedEventPages/Prajnotsavah/digital_dreams_qrcode.jpeg"
import upiImage from "@/assets/upi.png"

// -----------------------------------

import { useAuth } from "../contexts/AuthContext";
import { useMisc } from "../contexts/MiscContext";
import { utcToLocalTimeStamp } from "../scripts/Misc";
import Footer from "../components/Footer";

import axios from "../scripts/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";

import "../styles/EventRegister.scss";

const env = import.meta.env;
const digitalDreamsUpiId = "69097701@ubin"

export default function EventRegister() {
    const { USER_PRESENT, currentUser, signinwithpopup } = useAuth();
    const { readableError, setNavTitle } = useMisc();

    const [usingKluMail, setUsingKluMail] = useState(false);

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

    const registrationForm = useRef();
    const fullName = useRef();
    const regNo = useRef();
    const email = useRef();
    const year = useRef();
    const dept = useRef();
    const otherDept = useRef();
    const slot = useRef();
    const section = useRef();
    const num = useRef();
    const upiID = useRef()
    const tnsID = useRef()
    const imageUrlRef = useRef(null);
    // const utrNo = useRef()

    const registerForEvent = () => {
        if (!USER_PRESENT()) return;
        setEventRegisteringInProgress(true);

        console.log(otherDept?.current?.value);
        
        const upiIdPattern = /^[\w\s\.\-\_]+@[\w]+$/;
        if (!upiIdPattern.test(upiID.current.value)) {
            toast.error("The entered UPI ID is not following the UPI ID pattern. Example: yourname@oksbi");
            setEventRegisteringInProgress(false);
            return;
        }

        if (upiID.current.value == digitalDreamsUpiId) {
            toast.error("Please enter your UPI ID, you have currently entered OUR UPI ID.")
            setEventRegisteringInProgress(false);
            return;
        }

        const mobileNumberPattern = /^[6-9]\d{9}$/;
        if (!mobileNumberPattern.test(num.current.value)) {
            toast.error("The entered mobile number is not valid. Please enter a valid 10-digit Indian mobile number without +91.");
            setEventRegisteringInProgress(false);
            return;
        }

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
                    upiID : upiID.current.value,
                    tnsID : tnsID.current.value,
                    imageUrlRef : imageUrlRef.current
                    // utrNo : utrNo.current.value
                }
                // { headers: { Authorization: currentUser.getIdToken() } }
            )
            .then((res) => {
                console.log(res);
                setModalOpen(false);
                setNoOfRegistered((noOfRegistered) => noOfRegistered + 1);
                setEventRegisteringInProgress(false);
                setEventRegisterStatus("registered");
                toast.success("You are registered for Algorithmist 2025!");
            })
            .catch((e) => {
                console.warn(e);
                setEventRegisteringInProgress(false);
                toast.error(e.response.data.message);
            });
    };

    const getFieldValues = (field, email) => {
        console.log(`%c Prefilling details: ${email}`, "color: green");
        console.log(`Finding out user's ${field}`);
        
        
        if (field == "year") {
            let year = email.split("@")[0].slice(2,4)
            let years = { "21": "IV", "22": "III", "23": "II" }
            console.log(`User is from ${years[year]} year.`);
            return years[year];
        }

        if (field == "department") {
            let departments = {
                "8": "IT",
                "4": "CSE",
                "1": "BioTechnology",
                "6": "EEE",
                "5": "ECE", 
            }
            let dept = email.split("@")[0][6]
            if (Object.keys(departments).includes(dept)) {
                console.log(`User is from ${departments[dept]} department.`);
                return departments[dept];
            }
            else {
                return "OTHER"  // unknown reg no.
            }
        }
    }

    const prefillRegistrationFields = () => {
        regNo.current.value = currentUser.email.split("@")[0]
        year.current.value = getFieldValues("year", currentUser.email);
        let department =  getFieldValues("department", currentUser.email);

        if (department == "CSE" || department == "IT") {    // cse or it, set in dropdown alone, no need to show input field.
            setUserDept(department);
        }
        else if (department == "OTHER") {
            console.log("User is from OTHER department.");  // unknown department, set to other... and show empty input field.
            setUserDept("OTHER");
        }
        else {                                              // some known deparment other than cse, it. show input field and fill it.
            setUserDept("OTHER")
            console.log(otherDept.current)
            otherDept.current.value = department;
        }
        
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setEventID(window.location.pathname.split("/")[1]);

        console.log(`Width: ${window.innerWidth}px`);
        console.log(`Event ID: ${window.location.pathname.split("/")[1]}`)

        axios
            .post("/get_event_reg", {
                eventID: window.location.pathname.split("/")[1],
            })
            .then((res) => {
                console.log("------- Event REgistration staus");
                console.log(res.data.status);
                setEventRegistrationStatus(res.data.status);
            });

        axios
            .post("/get_event_start_time", {
                eventID: window.location.pathname.split("/")[1],
            })
            .then((res) => {
                console.log("setting start time");
                console.log(utcToLocalTimeStamp(res.data.time));
                setEventStart(utcToLocalTimeStamp(res.data.time));
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
    }, [modalOpen, usingKluMail]);

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
            console.log("User is logged in")
            if (currentUser.email.split("@")[1] == "klu.ac.in") {
                console.log("with KLU Mail. Getting event registration status.")
                setUsingKluMail(true);
                currentUser.getIdToken().then((token) => {
                    axios
                        .post(
                            "/get_event_reg_status",
                            { userID: currentUser.uid, eventID: eventID, email: currentUser.email },
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
            else {
                console.log("using personal account. Showing warning modal.")
                setUsingKluMail(false);
            }
        }
        else {
            // not logged in
        }
    }, [currentUser]);

    const [registrationLoading, setRegistrationLoading] = useState(false);
    const handleFileChange = async (e) => {
        try {
          console.log(e.target.files);
          setRegistrationLoading(true);
    
          if (e.target.files.length) {
            if (e.target.files.length > 1) {
              toast.error("You can only upload one image.");
              return;
            }
    
            const file = e.target.files[0];
            // setimageName(file.name)
    
            const reader = new FileReader();
            reader.onloadend = async () => {
              const response = await axios.post('https://api.cloudinary.com/v1_1/dvw9vd875/image/upload', {
                file: reader.result,
                upload_preset: "gfgcloud",
              });
              console.log('File uploaded successfully:', response.data);
    
              imageUrlRef.current = response.data.url;
    
              setRegistrationLoading(false);
            };
            reader.readAsDataURL(file);
          }
        } catch (err) {
          console.log("Error during Screenshot upload. Clearing SS field.");
          toast.error(err.message);
          imageUrlRef.current = "";
          setRegistrationLoading(false);
        }
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
                                    Algorithmist 2025
                                </div>

                                <div className="aboutEvent">
                                    Algorithmist '25 is a series of coding
                                    events organized by the GFG KARE Student
                                    Chapter in sponsorship with GeeksforGeeks at
                                    Kalasalingam Academy of Research and
                                    Education. The competition comprises five
                                    rounds, each progressively raising the bar
                                    in terms of complexity and challenge.
                                    Participants will become familiar with 30
                                    different algorithms and gain practical
                                    skills to apply them in real-world
                                    scenarios. 
                                    <br />
                                    <br />
                                    <p>
                                        <strong>Registration Fee: 200/- per person.</strong>
                                        <br /><br />
                                        <strong>2 Credits under EE</strong> will be provided for all participants.
                                        Cash prizes and exciting swags from GeeksforGeeks for the top three performers in each round.
                                    </p>
                                </div>

                                <div className="startsIn">
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
                                        onClick={() => {
                                            setModalOpen(true);
                                            prefillRegistrationFields();
                                        }}
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
                                        onMouseEnter={() => {
                                            toast.info("Kindly login with your KLU Mail", { toastId: "login_with_klu_reminder" })
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
                                            Individual
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
                                            02 Jan 2025, 12:59PM
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
                                            200/-
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
                                    <div className="roundName">Quiz</div>
                                </div>
                                
                                <div className="roundDesc">
                                    Get ready for a fun knowledge challenge! You'll answer 40 questions about
                                    30 algorithms. Can you beat the clock?
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
                                    <div className="roundName">Seminar</div>
                                </div>
                                
                                <div className="roundDesc">
                                    Share your coding expertise! During the Seminar round from Feb 3 to 6, 2025, you'll have 4-5 minutes to
                                    present an algorithm. Be the star of the show!
                                </div>
                            </div>
                        </div>
                        {/* <BsArrowDown size={"60px"} /> */}
                        <div className="round">
                            <div className="icon">
                                {/* <img src={qna} alt="Round 3 qna" /> */}
                                <span className="number">3</span>
                            </div>
                            <div className="info">
                                <div className="noAndName">
                                    {/* <div className="roundNo">Round 3</div> */}
                                    <div className="roundName">QnA Challenge</div>
                                </div>
                                
                                <div className="roundDesc">
                                    Work together to solve problems in our Q&A Formation Round on Feb 18, 2025. Create tricky questions for others
                                    to answer. How good is your teamwork?
                                </div>
                            </div>
                        </div>
                        <div className="round">
                            <div className="icon">
                                <span className="number">4</span>
                            </div>
                            <div className="info">
                                <div className="noAndName">
                                    <div className="roundName">Debugging</div>
                                </div>
                                
                                <div className="roundDesc">
                                    Time to tackle tricky bugs! In the Debugging round of Mar 7, 2025, you'll solve 10 questions.
                                    Can you outsmart the code?
                                </div>
                            </div>
                        </div>
                        <div className="round">
                            <div className="icon">
                                <span className="number">5</span>
                            </div>
                            <div className="info">
                                <div className="noAndName">
                                    <div className="roundName">Coding</div>
                                </div>
                                
                                <div className="roundDesc">
                                    It's the ultimate showdown! Join the Grand Finale on Mar 28, 2025, and show off your coding skills.
                                    Be the coding champion!
                                </div>
                            </div>
                        </div>
                        <span className="external">
                            More info about the 30 algorithms can be found <a href="https://gfgkare.github.io/Algorithmist25" target="_blank">here. <BiLinkExternal /></a>
                        </span>
                        <span className="external">
                            More info about all the 5 rounds can be found <a href="https://gfgkare.github.io/Algorithmist2025Rounds/" target="_blank">here. <BiLinkExternal /></a>
                        </span>

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
                                    <div className="registerBtn loading">
                                        <FiLoader className="icon" /> Registering 
                                    </div>
                                ) : eventRegisterStatus === "registered" ? (
                                    <div className="registerBtn">
                                        Registered.
                                    </div>
                                ) : (
                                    <div
                                        className="registerBtn"
                                        onClick={
                                            () => {
                                                setModalOpen(true);
                                                prefillRegistrationFields();
                                            }}
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
                        For any queries, please contact:{" "}
                    </div>
                    <div className="people">
                        <a href="tel:+91 7075072880">
                            {" "}
                            <span>Navadeep Marella - 70750 72880 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 8754605197">
                            {" "}
                            <span> Sabari - 87546 05197 </span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 9032772680">
                            {" "}
                            <span>Prasanthi - 90327 72680</span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                        <a href="tel:+91 9491146276">
                            {" "}
                            <span> Siri Chowdary - 94911 46276</span>{" "}
                            <BiSolidPhoneCall />{" "}
                        </a>
                    </div>
                    <br /><br /><br />
                    This site is under development, more details will be updated soon.
                </div>

                <Footer />
            </div>

            {/* REGISTER MODAL */}
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
                        ref={registrationForm}
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("ref..");
                            registerForEvent();
                        }}
                    >
                        <div className="row">
                            <div className="emailIndication">
                                <img src={currentUser?.photoURL} alt="" referrerPolicy="no-referrer" />
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
                            <span className="kluMailReminder">
                                <CiCircleInfo size={"15px"} />
                                <span className="text">
                                    Ensure you are logged in with YOUR KLU Email.
                                </span>
                            </span>
                            <span className="kluMailReminder">
                                <CiWarning size={"15px"} />
                                <span className="text">
                                    Same email and Register number cannot be used for another registration. 
                                </span>
                            </span>
                            <span className="kluMailReminder">
                                <PiSparkleThin size={"15px"} />
                                <span className="text">
                                    We've pre-filled your info from your email. Please check for any errors.
                                </span>
                            </span>
                            
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
                        <div 
                            className="row"
                            onClick={() => (!currentUser.email) ? toast.error("The register number is based on your Email and cannot be modified.", { toastId: "reg_no_disabled_info" }) : null}
                        >
                            <label for="email">Register No *</label>
                            <input
                                id="email"
                                type="number"
                                required
                                autoComplete="off"
                                ref={regNo}
                                disabled={ currentUser?.email }
                            />
                        </div>
                        <div className="row" onClick={() => getFieldValues("year", currentUser.email)}>
                            <label for="year">Year *</label>
                            <select 
                                name="year" 
                                ref={year}
                            >
                                <option value="IV">IV</option>
                                <option value="III">III</option>
                                <option value="II">II</option>
                            </select>
                        </div>
                        <div className="row">
                            <label for="department">Department *</label>
                            <select
                                name="department"
                                onChange={(e) => {
                                    setUserDept(e.currentTarget.value)
                                }}
                                value={userDept}
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
                        <div className="row" style={{ display: (userDept === "OTHER") ? "flex" : "none" }}>
                            <label for="department">Department *</label>
                            <input
                                type="text"
                                placeholder="Enter your department..."
                                ref={otherDept}
                                required={ userDept === "OTHER" }
                            />
                        </div>
                        {/* <div className="row" style={{ display: userDept === "OTHER" ? "block" : "none" }}>
                            <label htmlFor="department">Department *</label>
                            <input
                                type="text"
                                placeholder="Enter your department..."
                                ref={otherDept}
                                required
                            />
                        </div> */}
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
                        <div className = "row">
                        <label for="num">Payment *</label>
                        <img src={upiQR} alt="Upi scanner" style={{ width: '40%' , marginLeft: "30%"}} />
                        <p style={{marginLeft: "35%"}}>Registration fee 200/-</p>
                        <a className="upiPayButton" href={`upi://pay?pa=${digitalDreamsUpiId}&pn=GFGKARE&cu=INR&am=200`}>PAY WITH ANY <img src={upiImage} alt="" /> APP</a>
                        </div>
                        <div className="row">
                        <label htmlFor="">Upload your transaction Screenshot *</label>
                        <input
                                id="screenshotInput"
                                required
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            
                            {/* Display the uploaded image using the imageUrlRef */}
                            {imageUrlRef.current && (
                                <img src={imageUrlRef.current} alt="Uploaded" style={{ maxWidth: '20%', marginTop: '10px' , marginLeft: "40%"}} />
                            )}

                            {registrationLoading && <p> <FiLoader /> Uploading...</p>}
                        </div>
                        <div className="row">
                            <label htmlFor="">Your UPI ID *</label>
                            <input 
                                type="text" 
                                autoComplete="off" 
                                ref={upiID}
                                pattern="[\w\s\.\-\_]+@[\w]+"
                                title="The entered UPI ID is not following the UPI ID pattern."
                                required 
                            />
                            <span className="kluMailReminder" style={{ margin: "0px" , marginTop: "1%", color: "black"}}>
                                <CiCircleInfo size={"15px"} />
                                <span className="text">
                                    Ensure that you enter your UPI ID.
                                </span>
                            </span>
                        </div>
                        <div className="row">
                            <label htmlFor="">Transaction ID / UTR Number *</label>
                            <input type="text" 
                            required
                            ref={tnsID}
                            minLength={12}
                            maxLength={12}
                            autoComplete="off"/>
                        </div>

                        <div className="row">
                            <button>
                                {eventRegisteringInProgress
                                    ? <> <FiLoader /> Registering </>
                                    : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div
                className={(USER_PRESENT() && !usingKluMail) ? "changeMailModal modal open" : "changeMailModal modal"}
                // onClick={() => setModalOpen(false)}
                onClick={() => {
                    console.log("Logged in? ", USER_PRESENT());
                    console.log("Using KLU Mail?", usingKluMail);
                    console.log("Show Modal? ", (USER_PRESENT() && !usingKluMail));
                    
                }}
            >
                <div className="box">
                    <h4>
                        ⚠️Login with KLU Email
                    </h4>
                    
                    <span className="info">
                        You are not currently logged in with your KLU Email. Please <strong>log in using your KLU Email</strong> address to complete your registration for Algorithmist '25.
                    </span>
                        
                    <div className="emailIndication">
                        <img src={currentUser?.photoURL} alt="" referrerPolicy="no-referrer" />
                        <div
                            onClick={() => {
                                setModalOpen(false);
                                signinwithpopup("google");
                            }}
                        >
                            <span className="email">
                                Currently logged in as {currentUser?.email}
                            </span>
                            <span>Click to log in with your KLU Mail</span>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
