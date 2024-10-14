import "@/styles/ProjectExpo.scss";

import { motion } from "framer-motion";

import { BsChevronDoubleDown } from "react-icons/bs";
import { RiGroupFill, RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineListAlt } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { GoClock } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { FaDiamond, FaRocket, FaRegClock } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

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

const nov8 = 1731036600;

export default function ProjectExpo() {

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
        const timer = setInterval(() => {
           refreshLiveCount();
        }, 15000);
        console.log("Set interval for live conut");
        
        return () => clearInterval(timer);
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

            <div className="projectExpoContainer">
                <motion.div 
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
                </motion.div>

                <div className="navContainer">
                    <nav className="projectExpoNav">
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
                                        <button onClick={() => registerSection.current.scrollIntoView()}>Register</button>
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
                
                <div className="projectExpo">
                    <div className="content">
                        <div className="heroDiv">
                            <div className="gfgKarePresents">
                                <Fade className="awesomeFade" triggerOnce>
                                    <AttentionSeeker className="awesomeFlash" effect="flash" cascade damping={0.1}  delay={1000}>
                                        <span className="title">
                                            GFG KARE
                                        </span>
                                        <span className="presents">
                                            PRESENTS
                                        </span>
                                    </AttentionSeeker>
                                </Fade>
                            </div>
                            
                            <div className="projectExpoText">
                                <motion.span 
                                    className={"name"}
                                    initial={{ x: "-250%" }} 
                                    animate={{ x: "-5%" }} 
                                    transition={{ duration: .25, delay: 2 }}
                                >
                                    PRAJñOTsavah
                                </motion.span>
                                <motion.span
                                    className={"year"}
                                    initial={{ x: "+200%" }} 
                                    animate={{ x: "72%" }} 
                                    transition={{ duration: .25, delay: 2 }}
                                >
                                    2K24
                                </motion.span>
                            </div>
                        </div>

                        <Fade delay={3000} triggerOnce damping={0.5}>
                            <span className="subTitle">a national level project expo</span>
                        </Fade>
                        
                        <Fade delay={3500} triggerOnce cascade damping={0.85}>
                            <div className="dateAndTime">
                                <div className="row">
                                    <div className="icon"><GoClock size={"20px"} /></div>
                                    <div className="text">Nov 8, 2024, 9:30 AM</div>
                                </div>
                                <div className="row">
                                    <div className="icon"><CiLocationOn size={"20px"} /></div>
                                    <div className="text">Kalasalingam University</div>
                                </div>
                            </div>
                        </Fade>
                        
                        <Fade delay={4500} triggerOnce cascade damping={0.5}>
                            <div className="timerContainer">
                                <CountdownTimer
                                    count={parseInt((nov8 - (new Date().getTime()) / 1000))}
                                    border
                                    showTitle
                                    size={(window.innerWidth > 900) ? 22 : 16}
                                />
                            </div>
                        </Fade>

                        <Fade delay={5000} triggerOnce cascade damping={0.5}>
                            <div className="closingSoon">
                                Registrations closing soon!
                            </div>
                        </Fade>
                        
                        <Fade delay={6000}>
                            <div className="actionButtonContainer">
                                <AttentionSeeker effect="tada" delay={6000}>
                                        <button className="actionButton" onClick={() => {
                                            whatSection?.current.scrollIntoView()
                                        }}>
                                            <BsChevronDoubleDown size={"40px"} />
                                            LET'S GO!
                                        </button>
                                </AttentionSeeker>
                            </div>
                        </Fade>
                        

                <div className="FourQuestionSection" id="detailed" ref={whatSection}  style={{ scrollMargin: "100px" }}>
                    <Fade delay={500} cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText red">
                                WHAT
                            </div>
                            <div className="subText">
                                IS PRAJÑOTSAVAH?
                            </div>
                        </div>
                        <Slide triggerOnce>
                            <div className="normalSectionText">
                                Prajñotsavah is an inter-college project exhibition event proudly hosted by GeeksForGeeks KARE Student Chapter. We invite you to <span className="color purple">showcase your innovative project and compete for the top prize.</span> Choose from a selection of captivating themes, develop a project, and present it to our esteemed panel. Impress us with your project's uniqueness, practical usability, and real-life application. The most exceptional teams will walk away with magnificent grand prizes.
                            </div>
                        </Slide>
                        
                    </Fade>
                    
                </div>

                <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText green">
                                WHO
                            </div>
                            <div className="subText">
                                ARE WE?
                            </div>
                        </div>

                        <Slide direction="right" triggerOnce>
                            <div className="normalSectionText who">
                                <div className="normalSectionContent">
                                    The <span className="color green">GFG KARE Student Chapter</span>, proudly <span className="color green">affiliated with GeeksforGeeks</span>, is a vibrant community of tech enthusiasts and future innovators at Kalasalingam Academy of Research and Education.
                                </div>
                                <div className="normalSectionContent">
                                    <span className="color red">We organize workshops, coding competitions, hackathons, and guest lectures.</span>
                                </div>
                                <div className="normalSectionContent">
                                    Join us in our journey to push the boundaries of what's possible in the world of technology. Know more about our initiations at <a href="https://linktr.ee/gfg_kare" target="_blank">linktr.ee/gfg_kare</a>
                                </div>
                                
                                <div className="title">OUR PAST EVENTS WERE SO MUCH FUN!</div>

                                <div className="pastEventsContainer">
                                    <a target="_blank" href={"https://www.linkedin.com/posts/gfg-kare-student-chapter_geeksforgeeks-gfgkare-gfgkarestudentchapter-activity-7056933306713477120-wh3V/"}>
                                        <div className="pastEvent">
                                            Geeks Summer Carnival 
                                            <div className="explore">
                                                Visit
                                            </div>
                                        </div>
                                    </a>
                                    
                                    <a target="_blank" href={"https://www.linkedin.com/posts/krishna-vineeth-12b780219_hello-everyone-i-am-very-excited-to-share-activity-6985549997480046592-_Yvy/"}>
                                        <div className="pastEvent">
                                            Java CodeFest '22
                                            <div className="explore">
                                                Visit
                                            </div>
                                        </div>
                                    </a>

                                    <a target="_blank" href={"https://www.linkedin.com/posts/gfg-kare-student-chapter_geekfest2k24-campaign-kare-activity-7227871557295951873-spSv/"}>
                                        <div className="pastEvent">
                                            GeekFest '24
                                            <div className="explore">
                                                Visit
                                            </div>
                                        </div>
                                    </a>

                                    <a target="_blank" href={"https://www.linkedin.com/posts/gfg-kare-student-chapter_algorithmist24-gfg-gfgkare-activity-7178819835282300930-4Jht/"}>
                                        <div className="pastEvent">
                                            Algorithmist '24
                                            <div className="explore">
                                                Visit
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Slide>

                        
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
                                    Prajñotsavah is <span className="color yellow">open to all engineering students</span>, irrespective of year and branch.
                                </div>
                                <div className="normalSectionContent">
                                    A team can have a <span className="color green">maximum of 4 members</span> and a <span className="color green">minimum of 2 members.</span>
                                </div>
                                <div className="normalSectionContent">
                                    Registration fee of Rs <span className="color red">500/- per team</span> should be paid to complete the registration process.
                                </div>
                            </div>
                        </Slide>

                        <Fade delay={500}>
                            <div className="closingSoon">
                                We will be closing the registration form on Oct 20.
                                Form a team and get the seat now!
                                <CLink to={"/events/prajnotsavah/register"} > {"Register >"} </CLink>
                            </div>
                        </Fade>

                    </Fade>
                </div>


                <div className="FourQuestionSection">
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
                    
                </div>

                <div className="FourQuestionSection">
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
                    
                </div>


                <div className="FourQuestionSection prizes">
                    <Fade className="fadePrizes" cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText orange">
                                PRIZES
                            </div>
                            {/* <div className="subText">
                            </div> */}
                        </div>
                        <div className="normalSectionText prizes">
                            <div className="prizesGrid">
                                <Slide className="slidePrizeCard" triggerOnce>
                                    <div className="prizeCard first">
                                        <div className="circle"></div>
                                        <div className="position">WINNER</div>
                                        <div className="prize">₹ 10,000</div>
                                        <div className="and">+ certificate and GFG swags!</div>
                                    </div>
                                    <div className="prizeCard second">
                                        <div className="circle"></div>
                                        <div className="position">1ST RUNNER UP</div>
                                        <div className="prize">₹ 7,000</div>
                                        <div className="and">+ certificate and GFG swags!</div>
                                    </div>
                                    <div className="prizeCard third">
                                        <div className="circle"></div>
                                        <div className="position">2ND RUNNER UP</div>
                                        <div className="prize">₹ 5,000</div>
                                        <div className="and">+ certificate and GFG swags!</div>
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
                
                
                <Fade>
                    <div className="actionButtonContainer">
                            <button className="actionButton" onClick={() => themesSection?.current.scrollIntoView()}>
                            <BsChevronDoubleDown size={"40px"} />
                            PICK A THEME!
                        </button>
                    </div>    
                </Fade>
                        

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
                        </div>

                        <div className="FourQuestionSection liveCount">
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
                        </div>


                        <div className="FourQuestionSection" ref={registerSection} style={{ scrollMargin: "100px" }}>
                            <Fade cascade damping={.1} triggerOnce>
                                <div className="sectionTitleText">
                                    <div className="bigText">
                                        REGISTER
                                    </div>
                                </div>

                                <div className="normalSectionText register">
                                    Ready for the big event? Make sure to fill the details carefully and pay the registration fee to complete the registration process. Once you have registered, you will receive a confirmation email with further instructions. We can't wait to see your project!

                                    <div className="note">
                                        <span className="color red">NOTE:</span> Please ensure the filled details are correct as they will be used for further communication.
                                        The details will also be verified at the time of the offline presentation. 
                                        <span className="color purple"> Use your college email address</span> if available.
                                    </div>

                                    <CLink to="/events/prajnotsavah/register">
                                        <button>GO TO REGISTER PAGE!</button>
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
                                    <span>Ashok Reddy Cheluri - <a href="tel:+91 95158 22637">95158 22637</a> </span>
                                    <span>Sabari S - <a href="tel:+91 87546 05197">+91 87546 05197</a> </span>
                                    <span>Navuluri Balaji - <a href="tel:+91 93468 30134">93468 30134</a> </span>
                                    <span>Mallavarapu Vaishnavi - <a href="tel:+91 90590 93929">90590 93929</a> </span>
                                    <span>Yaramasu Sravani - <a href="tel:+91 93982 36858">93982 36858</a> </span>
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