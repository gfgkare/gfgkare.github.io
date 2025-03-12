import "./G2Hack.scss";

import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { BsChevronDoubleDown } from "react-icons/bs";
import { RiGroupFill, RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineListAlt } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { GoClock } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";

import Squares from "./ui/Squares/Squares";
import ScrollVelocity from "./ui/ScrollVelocity/ScrollVelocity";
import ShinyText from "./ui/ShinyText/ShinyText";
import RotatingText from "./ui/RotatingText/RotatingText";
import FollowCursor from "./ui/FollowCursor/FollowCursor";
import RollingGallery from "./ui/RollingGallery/RollingGallery";
import Coin from "./ui/Coin/Coin";

import kluLogo from "@/assets/klu.png";
import gfgkareLogo from "@/assets/gfgkare_square_logo.jpg";
import gfgLogo from "@/assets/gfg.png";

import { useState, useRef, useEffect } from "react";
import { Fade, AttentionSeeker, Slide } from "react-awesome-reveal";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";

import CLink from "@/components/CLink";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import axios from "@/scripts/axiosConfig";

const themeDetails = {
    "Healthcare": {
        statement: "Design an AI-powered diagnosis system capable of accurately analyzing medical images like X-rays, MRIs, and CT scans that would aid radiologists in the early diagnosis of diseases like cancer and hence reduce diagnosis time for better patient outcomes.",
        title: "AI-Powered Diagnosis System"
    },
    "FinTech": {
        title: "Innovative Credit Scoring Model",
        statement: "Create an innovative credit scoring model and lending platform to improve access to credit for small businesses and individuals with limited credit history."
    },
    "AgroTech": {
        statement: "Design a smart irrigation system that integrates IoT sensors and machine learning techniques for reduced water usage in agricultural fields to increase crop yield and save water resources in regions challenged by water scarcity",
        title: "Smart Irrigation System"
    },
    "Fitness and Sports": {
        statement: "Design a customized fitness app that leverages wearable technology and artificial intelligence to create personalized workout plans, along with real-time feedback, toward fit goals without injuries.",
        title: "Personalized Fitness App"
    },
    "BlockChain": {
        statement: "Build a decentralized identity verification system using blockchain technology that allows users to securely share their verified credentials (such as educational certificates, work experience, and personal identification) with third parties, reducing identity theft and simplifying the verification process for employers and institutions.",
        title: "Decentralized Identity Verification"
    }
}

const mar29 = 1743211800;

export default function G2Hack() {

    const location = useLocation();
    const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();

    const [showThemeDetailsModal, setShowThemeDetailsModal] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [liveCountRefreshing, setLiveCountRefreshing] = useState(false);
    const [liveCount, setLiveCount] = useState(
        {
            "AgroTech": 3,
            "BlockChain": 0,
            "FinTech": 2,
            "Fitness and Sports": 1,
            "Healthcare": 6
        }
    );

    const whatSection = useRef();
    const themesSection = useRef();
    const registerSection = useRef();
 
 
    const handleThemeClick = (theme) => {
        document.body.style.overflow = 'hidden'
        setSelectedTheme(theme);
        console.log(theme)
        setShowThemeDetailsModal(true);
    }

    const closeThemeDetailsModal = () => {
        document.body.style.overflow = 'auto'
        setShowThemeDetailsModal(false);
    }

    const refreshLiveCount = () => {
        console.log("Refreshing count...");
        setLiveCountRefreshing(true);
        axios.get("/projectexpo_livecount")
        .then((res) => {
            console.log(res.data.count);
            setLiveCount(res.data.count);
            setLiveCountRefreshing(false);
        })
    }

    useEffect(() => {

        const query = new URLSearchParams(location.search);
        console.log(`Referred by '${query.get("ref")}'`)

        // const timer = setInterval(() => {
        //    refreshLiveCount();
        // }, 15000);
        // console.log("Set interval for live count");
        
        // return () => clearInterval(timer);
    }, [])

    return (
        <>
            {
                (showThemeDetailsModal) && (
                    <div className="themeDetailsModalContainer">
                        <div className="themeDetailsModal">
                            <div className="closeButtonContainer">
                                <button onClick={closeThemeDetailsModal}>Close</button>
                            </div>
                            <div className="theme bigText">{ selectedTheme }</div>
                            <div className="normalText">Sample Problem Statement</div>

                            <div className="sampleProblemStatement">
                                <div className="title">Title: {themeDetails[selectedTheme].title}</div>
                                <div className="statement">
                                    {themeDetails[selectedTheme].statement}
                                </div>
                            </div>

                            <div className="note">
                                NOTE: Not limited to this problem statement. You can make any project as long as it fits into the {selectedTheme} theme.
                            </div>
                        </div>
                    </div>
                )
            }

            {/* under ui folder. */}
            <Squares 
                speed={0.5} 
                squareSize={40}
                direction='diagonal' // up, down, left, right, diagonal
                borderColor='#6663'
                hoverFillColor='#2221'
            />

            <div className="g2hackContainer">
                {/* <motion.div 
                    className="backgroundElement"
                    initial={{ transform: "scale(0)", top: "40%" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{ duration: 1, delay: 5 }}
                >
                    <GoPlus size={"35px"} />
                </motion.div>
                <motion.div 
                    className="backgroundElement"
                    initial={{ transform: "scale(0)", top: "70%" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{ duration: 1, delay: 5 }}
                >
                    <FaDiamond size={"35px"} />
                </motion.div>
                <motion.div 
                    className="backgroundElement"
                    initial={{ transform: "scale(0)", top: "50%" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{ duration: 1, delay: 5 }}
                >
                    <FaRocket size={"35px"} />
                </motion.div> */}

                <div className="navContainer">
                    <nav className="g2hackNav">
                        <div className="logoContainer">
                            <CLink to={"https://kalasalingam.ac.in"} target="_blank">
                                <div className="logo klu">
                                    <img src={kluLogo}/>
                                </div>
                            </CLink>
                            <div className="logo">
                                <CLink to={"/"}>
                                    <img src={gfgkareLogo} />
                                </CLink>
                            </div>
                        </div>
                        

                        <div className="profile">
                            {
                                (USER_PRESENT()) ? (
                                    <>
                                        {/* <button onClick={() => registerSection.current.scrollIntoView()}>Closed</button> */}
                                        <CLink to={"/profile"}>
                                            <img src={currentUser.photoURL} alt="" />
                                        </CLink>
                                    </>
                                ) : (
                                    <div onClick={() => signinwithpopup("google")}>Sign In</div>
                                )
                            }
                        </div>
                    </nav>
                </div>
                
                <div className="g2hack">
                    <div className="content">
                        
                        <div className="landingSection">
                            <div className="heroDiv">
                                <motion.div
                                    className="clubs"
                                    initial={{ y: "450%", x: "1rem" }}
                                    animate={{ y: "0", x: "1rem" }}
                                    transition={{ duration: .25, delay: 2 }}
                                >
                                    <div className="gfgKarePresents">
                                            <Fade className="awesomeFade" triggerOnce>
                                                <AttentionSeeker className="awesomeFlash" effect="flash" cascade damping={0.1}  delay={1000}>
                                                    <span className="title">
                                                        <span className="gfg">GFG KARE</span>
                                                        X
                                                        <span className="gdg">GDG KARE</span>
                                                    </span>
                                                </AttentionSeeker>
                                            </Fade>
                                    </div>
                                </motion.div>
                                                    
                                <div className="g2hackText">
                                    <motion.span 
                                        className={"name"}
                                        initial={{ filter: "blur(10px)", opacity: 0, y: "10%" }}
                                        animate={{ filter: "blur(0px)", opacity: 1, y: "0" }}
                                        transition={{ duration: .35, delay: 3 }}
                                    >
                                        G2HackFest
                                    </motion.span>
                                </div>
                            </div>
                            
                            <Fade delay={4000} triggerOnce cascade damping={0.85}>
                                <div className="dateAndTime">
                                    <div className="row">
                                        <div className="icon"><GoClock size={"20px"} /></div>
                                        <div className="text">Mar 29, 2025 5PM</div>
                                    </div>
                                    <div className="row">
                                        <div className="icon"><CiLocationOn size={"20px"} /></div>
                                        <div className="text">Kalasalingam University</div>
                                    </div>
                                </div>
                            </Fade>
                            
                            <Fade delay={5000} triggerOnce cascade damping={0.5}>
                                <div className="timerContainer">
                                    <CountdownTimer
                                        count={parseInt((mar29 - (new Date().getTime()) / 1000))}
                                        border
                                        showTitle
                                        size={(window.innerWidth > 900) ? 22 : 16}
                                    />
                                </div>
                            </Fade>
                            
                            <Fade delay={6000}>
                                <div className="actionButtonContainer">
                                    <AttentionSeeker effect="tada" delay={6000}>
                                            <button className="actionButton" onClick={() => {
                                                // whatSection?.current.scrollIntoView()
                                            }}>
                                                <BsChevronDoubleDown size={"40px"} />
                                            </button>
                                    </AttentionSeeker>
                                </div>
                            </Fade>

                        </div>
                                        
                        <ScrollVelocity
                            texts={[
                                'Get ready! Get ready!', 
                                <span>For a <span className="REAL">REAL</span> hackathon.</span>,
                            ]} 
                            velocity={70} 
                            className="custom-scroll-text"
                        />

                       {/* <div className="comingSoon">
                            <div>Join the elite. Learn, network, and compete with top minds.</div>
                            <div>Interested? Click below and send <b>G2</b> to be the first to receive exclusive event details.</div>

                            <div className="buttons">
                                <Link to={"https://wa.me/+918754605197?text=G2"} target="_blank" className="filled">
                                    Let me know!
                                </Link>
                                <Link to={"https://calendar.google.com/calendar/r/eventedit?text=G2+Hackfest&dates=20250329T113000.000Z/20250330T113000.000Z&details=For+details,+link+here:+https://gfgkare.github.io/g2hack&location=Kalasalingam+University"} target="_blank" className="outlined">
                                    Add to calendar
                                </Link>
                            </div>
                       </div> */}

                <div className="FourQuestionSection" id="detailed" ref={whatSection}  style={{ scrollMargin: "100px" }}>
                    <Fade delay={500} cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText red">
                                Why Join?
                            </div>
                            {/* <div className="subText">
                                IS PRAJÑOTSAVAH?
                            </div> */}
                        </div>
                        <div className="normalSectionText">
                            <span className="color red">G2HACKFEST</span> is a hackathon that brings together the brightest minds of Kalasalingam University to solve real-world problems. Participants will have the opportunity to learn from industry experts, network with like-minded individuals, and compete for grand prizes. With a prize pool of over Rs. 15,000. Join now to learn, grow, and win big.
                        </div>
                        
                        <div className="rotatingText">
                            You get
                            <RotatingText
                                texts={['Experience 🧠', 'Networking 🌐', 'Swags 👕', 'Fun++ 😁', 'Prizes 💰', 'Snacks 😋']}
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={3000}
                            />
                            {/* <FollowCursor
                                parentRef={whatSection}
                                offsetX={20}
                                cardWidth='200px'
                                rotationFactor={40}
                                enableTilt={true}
                                animationConfig={{ mass: 5, tension: 350, friction: 40 }}
                                wheelConfig={{ mass: 1, tension: 200, friction: 30 }}
                                >
                            </FollowCursor> */}
                        </div>
                    </Fade>
                    
                </div>

                <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText green">
                                WHO ARE WE?
                            </div>
                            {/* <div className="subText">
                                ARE WE?
                            </div> */}
                        </div>

                        <Fade cascade damping={.1} triggerOnce>
                            <div className="normalSectionText who">
                                <div className="normalSectionContent">
                                    We are two of the most active tech clubs in Kalasalingam University - <span className="gfg">GeeksForGeeks KARE</span> and <span className="gdg">GDG OnCampus KARE</span>.
                                </div>
                                <div className="normalSectionContent">
                                    <span className="color red">We organize workshops, coding competitions, hackathons, and guest lectures.</span>
                                </div>
                                
                                {/* COIN */}
                                <Coin />

                                <div className="title" style={{ marginTop: "2rem" }}>OUR PAST EVENTS WERE SO MUCH FUN!</div>

                                <RollingGallery autoplay={true} pauseOnHover={true} />

                            </div>
                        </Fade>

                        
                    </Fade>
                </div>

                <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText blue">
                                PROCESS
                            </div>
                            <div className="subText">
                                OF REGISTRATION
                            </div>
                        </div>

                        <Slide direction="right" triggerOnce>
                            <div className="normalSectionText">
                                <div className="normalSectionContent">
                                    G2Hackfest is <span className="color yellow">open to all engineering students</span>, irrespective of year and branch.
                                </div>
                                <div className="normalSectionContent">
                                    A team can have <span className="color green">3 or 4 members.</span>
                                </div>
                                <div className="normalSectionContent">
                                    Registration fee of Rs <span className="color red">300/- per head</span> should be paid to complete the registration process.
                                </div>
                            </div>
                        </Slide>

                        {/* <Fade delay={500}>
                            <div className="closingSoon">
                                We will be closing the registration form on Oct 20.
                                Form a team and get the seat now!
                                <CLink to={`/events/prajnotsavah/register?ref=${new URLSearchParams(location.search).get('ref')}`} > {"Register >"} </CLink>
                            </div>
                        </Fade> */}

                    </Fade>
                </div>


                {/* <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText green">
                                WHY
                            </div>
                            <div className="subText">
                                JOIN PRAJÑOTSAVAH?
                            </div>
                        </div>

                        <Slide triggerOnce>
                            <div className="normalSectionText why">
                                Prajñotsavah offers knowledge, mentorship, recognition, and competition. Participants receive mentorship to refine their projects, ensuring they are practical and impactful. Showcase your work to gain recognition and compete for grand prizes. With a <span className="color pink">prize pool of over Rs. 22,000</span>, the competition is fierce, and the rewards are substantial. Join now to learn, grow, and win big.

                                <div className="whyReasonsContainer">
                                    <div className="whyReason">
                                        Grand prizes upto 10K!
                                    </div>
                                    <div className="whyReason">
                                        Exclusive swags from GeeksForGeeks!
                                    </div>
                                    <div className="whyReason">
                                        And much more!
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </Fade>
                </div> */}

                {/* <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText yellow">
                                WHERE
                            </div>
                            <div className="subText">
                                IS THIS HAPPENING!?
                            </div>
                        </div>
                        <Slide direction="right" triggerOnce>
                            <div className="normalSectionText map">
                                <div className="text">
                                    Prajñotsavah is happening in the prestigious <span className="color cyan">Kalasalingam University in Krishnankoil, Tamil Nadu.</span> The event will be held in the university's state-of-the-art facilities, providing participants with a conducive environment to present their projects. The offline presentation will be held on <span className="color green">November 8, 2024</span>, and the winners will be announced on the same day.
                                </div>
                                <div className="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.2384182267283!2d77.67723340993616!3d9.574705190470475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06dbc06968e9eb%3A0x6cfd8f94e42f98c4!2sKalasalingam%20Academy%20of%20Research%20and%20Education!5e0!3m2!1sen!2sin!4v1722789691882!5m2!1sen!2sin" width="400" height="300" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                
                            </div>
                        </Slide>
                    </Fade>
                </div> */}


                <div className="FourQuestionSection prizes">
                    <Fade className="fadePrizes" cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText orange">
                                PRIZES
                            </div>
                        </div>
                        <div className="normalSectionText prizes">
                            <div className="prizesGrid">
                                <Slide className="slidePrizeCard" triggerOnce>
                                    <div className="prizeCard first">
                                        <div className="circle"></div>
                                        <div className="position">WINNER</div>
                                        <div className="prize">₹ 7,000</div>
                                        <div className="and">+ certificate and swags!</div>
                                    </div>
                                    <div className="prizeCard second">
                                        <div className="circle"></div>
                                        <div className="position">1ST RUNNER UP</div>
                                        <div className="prize">₹ 5,000</div>
                                        <div className="and">+ certificate and swags!</div>
                                    </div>
                                    <div className="prizeCard third">
                                        <div className="circle"></div>
                                        <div className="position">2ND RUNNER UP</div>
                                        <div className="prize">₹ 3,000</div>
                                        <div className="and">+ certificate and swags!</div>
                                    </div>
                                    <div className="prizeCard participation">
                                        <div className="circle"></div>
                                        <div className="position">PARTICIPANTS</div>
                                        <div className="prize"></div>
                                        <div className="and">Certificate</div>
                                    </div>
                                </Slide>
                            </div>
                        </div>
                    </Fade>
                </div>

                <div className="FourQuestionSection prizes">
                    <Fade className="fadePrizes" cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText orange">
                                BENEFITS
                            </div>
                        </div>
                        <div className="normalSectionText benefits">
                            <div className="benefitsRowGrid">
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        2 EE Credits for all participants
                                    </div>
                                </div>
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        Networking opportunities
                                    </div>
                                </div>
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        Scrumptious food
                                    </div>
                                </div>
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        Take home cool swags
                                    </div>
                                </div>
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        Exciting cash prizes
                                    </div>
                                </div>
                                <div className="benefit">
                                    <div className="icon">
                                        <GoPlus size={"25px"} />
                                    </div>
                                    <div className="text">
                                        Sponsor goodies
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                
                
                {/* <Fade>
                    <div className="actionButtonContainer">
                            <button className="actionButton" onClick={() => themesSection?.current.scrollIntoView()}>
                            <BsChevronDoubleDown size={"40px"} />
                            PICK A THEME!
                        </button>
                    </div>    
                </Fade>
                         */}
{/* 
                <div className="FourQuestionSection" id="themes" ref={themesSection} style={{ scrollMargin: "100px" }}>
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText purple">
                                THEMES
                            </div>
                        </div>

                                <div className="normalSectionText">
                                    <div className="themesGrid">
                                        <Slide triggerOnce>
                                            <div className="card healthcare" onClick={() => handleThemeClick("Healthcare")}>Healthcare</div>
                                            <div className="card fintech" onClick={() => handleThemeClick("FinTech")}>FinTech</div>
                                            <div className="card agrotech" onClick={() => handleThemeClick("AgroTech")}>AgroTech</div>
                                            <div className="card fitness" onClick={() => handleThemeClick("Fitness and Sports")}>Fitness and Sports</div>
                                            <div className="card blockchain" onClick={() => handleThemeClick("BlockChain")}>BlockChain</div>
                                        </Slide>
                                    </div>
                                </div>
                            </Fade>
                        </div>

                        <div className="FourQuestionSection">
                            <Fade cascade damping={.1} triggerOnce>
                                <div className="sectionTitleText">
                                    <div className="bigText magenta">
                                        RULES
                                    </div>
                                    <div className="subText">
                                    </div>
                                </div>

                                <div className="normalSectionText">
                                    <div className="rulesList">
                                        <div className="rule">
                                            <div className="icon">
                                                <RiGroupFill size={"25px"} />
                                            </div>
                                            <div className="text">
                                                Team of 2 - 4 people
                                            </div>
                                        </div>
                                        <div className="rule">
                                            <div className="icon">
                                                <FaRegClock size={"25px"} />
                                            </div>
                                            <div className="text">
                                                Only projects that have been started AFTER the stipulated time ( Sep 12th 2024 ) will be accepted.
                                            </div>
                                        </div>
                                        <div className="rule">
                                            <div className="icon">
                                            <MdOutlineListAlt size={"25px"} />

                                            </div>
                                            <div className="text">
                                                The projects should strictly align with any of the given themes.
                                            </div>
                                        </div>
                                        <div className="rule">
                                            <div className="icon">
                                            <RiErrorWarningLine size={"25px"} />

                                            </div>
                                            <div className="text">
                                            No plagiarism.

                                            </div>
                                        </div>
                                        <div className="rule">
                                            <div className="icon">
                                            <IoTicket size={"25px"} />

                                            </div>
                                            <div className="text">
                                                The registration fee of Rs. 500 (per team) should be paid to complete the registration.
                                                This fee covers the registration, mentorship, refreshments and the ticket for the offline presentation.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </div> */}

                        {/* <div className="FourQuestionSection liveCount">
                            <Fade cascade damping={.1} triggerOnce>
                                <div className="sectionTitleText">
                                    <div className="bigText magenta">
                                        LIVE COUNT
                                    </div>
                                    <div className="subText">
                                        live count of all the registrations.
                                    </div>
                                </div>

                                <div className="normalSectionText">
                                    <div className="tableContainer">
                                        <button className={`${liveCountRefreshing && 'show'}`}>
                                            <LuLoader />
                                            refreshing
                                        </button>
                                        <table id="countTable">
                                            <tr>
                                                <th>Theme</th>
                                                <th>Count</th>
                                            </tr>
                                            <tr>
                                                <td>Healthcare</td>
                                                <td>{liveCount['Healthcare']}</td>
                                            </tr>
                                            <tr>
                                                <td>FinTech</td>
                                                <td>{liveCount['FinTech']}</td>
                                            </tr>
                                            <tr>
                                                <td>AgroTech</td>
                                                <td>{liveCount['AgroTech']}</td>
                                            </tr>
                                            <tr>
                                                <td>Fitness and Sports</td>
                                                <td>{liveCount['Fitness and Sports']}</td>
                                            </tr>
                                            <tr>
                                                <td>Blockchain</td>
                                                <td>{liveCount['BlockChain']}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </Fade>
                        </div> */}


                        <div className="FourQuestionSection" ref={registerSection} style={{ scrollMargin: "100px" }}>
                            <Fade cascade damping={.1} triggerOnce>
                                <div className="sectionTitleText">
                                    <div className="bigText">
                                        REGISTER
                                    </div>
                                </div>

                                <div className="normalSectionText register">
                                    Ready for the big event? Make sure to fill the details carefully and pay the registration fee to complete the registration process. Once you have registered, you will receive a confirmation email with further instructions.

                                    <div className="note">
                                        <span className="color red">NOTE:</span> Please ensure the filled details are correct as they will be used for further communication.
                                        The details will also be verified at the time of the hackathon. 
                                        <span className="color purple"> Use your college email address only.</span>
                                    </div>

                                    <CLink to={`/events/prajnotsavah/register?ref=${new URLSearchParams(location.search).get('ref')}`}>
                                        <button disabled>REGISTRATIONS OPENING SOON</button>
                                    </CLink>
                                </div>

                                
                            </Fade>
                        </div>

                        <div className="FourQuestionSection">
                            <Fade cascade damping={.1} triggerOnce>
                                <div className="sectionTitleText">
                                    <div className="bigText orange">
                                        SPONSORS
                                    </div>
                                </div>

                                <div className="normalSectionText sponsors">
                                    <div className="themesGrid">
                                        <Slide className="slideSponsor" triggerOnce>
                                            <CLink to={"https://www.geeksforgeeks.org/"} target={"_blank"}>
                                                <div className="sponsorCard">
                                                    <div className="sponsorLogo">
                                                        <img src={gfgLogo} />
                                                    </div>
                                                    <div className="sponsorName">GeeksForGeeks</div>
                                                </div>
                                            </CLink>
                                            <CLink to={"https://gen.xyz"} target={"_blank"}>
                                                <div className="sponsorCard">
                                                    <div className="sponsorLogo">
                                                        <img src={gfgLogo} />
                                                    </div>
                                                    <div className="sponsorName">XYZ Domains</div>
                                                </div>
                                            </CLink>
                                        </Slide>
                                    </div>
                                </div>
                            </Fade>
                        </div>

                        <div className="faq"></div>

                        <div className="FourQuestionSection">
                            <div className="sectionTitleText">
                                <div className="bigText yellow">
                                    CONTACT
                                </div>
                                <div className="subText">
                                    
                                </div>
                            </div>

                            <div className="normalSectionText">
                            <div className="contact">
                                <div className="title">For any queries, feel free to contact</div>
                                <div className="numbers">
                                    <span>Sabari S - <a href="tel:+91 87546 05197">+91 87546 05197</a> </span>
                                </div>
                                <div className="email">
                                    Or drop a mail to <a href="mailto:gfgkarestudentchapter@gmail.com">gfgkarestudentchapter@gmail.com</a>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        
                    </div>

                    <Footer />
                </div>
            
            </div>


        </>
        
    )
}