import "../../styles/ProjectExpo.scss";


import { motion } from "framer-motion";

import { BsChevronDoubleDown } from "react-icons/bs";
import { RiGroupFill, RiErrorWarningLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineListAlt } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaDiamond, FaRocket } from "react-icons/fa6";
import { GiAlarmClock } from "react-icons/gi";



import kluLogo from "../../assets/klu.png";
import gfgkareLogo from "../../assets/gfgkare_square_logo.jpg";
import { useState, useRef } from "react";
import { Fade, AttentionSeeker, Slide } from "react-awesome-reveal";

import CLink from "../../components/CLink";
import { useAuth } from "../../contexts/AuthContext";

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

export default function ProjectExpo() {

    const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();

    const [showThemeDetailsModal, setShowThemeDetailsModal] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);

    const whatSection = useRef();
    const themesSection = useRef();

    const handleThemeClick = (theme) => {
        document.body.style.overflow = 'hidden'
        setSelectedTheme(theme);
        console.log(theme)
        setShowThemeDetailsModal(true);
    }

    const closeThemeDetailsModal= () => {
        document.body.style.overflow = 'auto'
        setShowThemeDetailsModal(false);
    }

    return (
        <>
            {
                (showThemeDetailsModal) && (
                    <div className="themeDetailsModalContainer">
                        <div className="themeDetailsModal">
                            <button className="close" onClick={closeThemeDetailsModal}>Close</button>
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
                    transition={{ duration: 1, delay: 3 }}
                >
                    <GoPlus size={"35px"} />
                </motion.div>
                <motion.div 
                    className="backgroundElement"
                    initial={{ transform: "scale(0)", top: "70%" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <FaDiamond size={"35px"} />
                </motion.div>
                <motion.div 
                    className="backgroundElement"
                    initial={{ transform: "scale(0)", top: "50%" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <FaRocket size={"35px"} />
                </motion.div>

                <div className="navContainer">
                    <nav className="nav">
                        <div className="logoContainer">
                            <div className="logo klu">
                                <img src={kluLogo}/>
                            </div>
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
                                        <button>Register</button>
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
                                    transition={{ duration: .25, delay: 1.75 }}
                                >
                                    PRAJñOTsavah
                                </motion.span>
                                <motion.span
                                    className={"year"}
                                    initial={{ x: "+200%" }} 
                                    animate={{ x: "72%" }} 
                                    transition={{ duration: .25, delay: 1.75 }}
                                >
                                    2K24
                                </motion.span>
                            </div>
                        </div>
                        
                        <div className="actionButtonContainer">
                            <AttentionSeeker effect="tada" delay={3000}>
                                    <button className="actionButton" onClick={() => {
                                        whatSection?.current.scrollIntoView()
                                    }}>
                                        <BsChevronDoubleDown size={"40px"} />
                                        LET'S GO!
                                    </button>
                            </AttentionSeeker>
                            
                        </div>

                        <div className="FourQuestionSection" id="detailed" ref={whatSection}>
                            <Fade cascade damping={.1} triggerOnce>
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
                                        <div className="normalSectionContent">
                                            Prajñotsavah is an Inter College competition organized by <span className="color green">GeeksforGeeks KARE Student Chapter</span> from Kalasalingam Academy of Research and Education on 28th September, 2024. It comprises two rounds for exhibiting your projects. The presented solution for the problem statement can be either software or hardware model. 
                                        </div>
                                        <div className="normalSectionContent">
                                            This event is a unique opportunity to <span className="color purple"> bridge the gap between technology advancement and sustainability practices.</span> This is an opportunity to interact and demonstrate your unique skills to a broader community beyond your college.
                                        </div>
                                    
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
                                    <div className="normalSectionText">
                                        <div className="normalSectionContent">
                                            The <span className="color green">GFG KARE Student Chapter</span>, proudly <span className="color green">affiliated with GeeksforGeeks</span>, is a vibrant community of tech enthusiasts and future innovators at Kalasalingam Academy of Research and Education.
                                        </div>
                                        <div className="normalSectionContent">
                                            Our chapter serves as a bridge between academic knowledge and practical application, providing students with opportunities to enhance their skills in coding, problem-solving, and cutting-edge technologies. <span className="color red">We organize workshops, coding competitions, hackathons, and guest lectures</span> to create an environment where creativity and technical expertise can flourish.
                                        </div>
                                        <div className="normalSectionContent">
                                            Join us in our journey to push the boundaries of what's possible in the world of technology. Know more about our initiations at <a href="https://linktr.ee/gfg_kare" target="_blank">linktr.ee/gfg_kare</a>
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
                                        Project Expo offers knowledge, mentorship, recognition, and competition. Participants receive mentorship to refine their projects, ensuring they are practical and impactful. Showcase your work to gain recognition and compete for grand prizes. With a <span className="color pink">prize pool of over Rs. 20,000</span>, the competition is fierce, and the rewards are substantial. Join now to learn, grow, and win big.

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
                                        IS PROJECT EXPO HAPPENING!?
                                    </div>
                                </div>
                                <Slide direction="right" triggerOnce>
                                    <div className="normalSectionText map">
                                        <div className="text">
                                            Project Expo is happening in the prestigious <span className="color cyan">Kalasalingam University in Krishnankoil, Tamil Nadu.</span> The event will be held in the university's state-of-the-art facilities, providing participants with a conducive environment to present their projects. The offline presentation will be held on <span className="color green">September 27, 2024</span>, and the winners will be announced on the same day.
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
                                            <div className="prizeCard">
                                                <div className="circle"></div>
                                                <div className="position">WINNER</div>
                                                <div className="prize">₹ 10,000</div>
                                                <div className="and">+ certificate and GFG swags!</div>
                                            </div>
                                            <div className="prizeCard">
                                                <div className="circle"></div>
                                                <div className="position">1ST RUNNER UP</div>
                                                <div className="prize">₹ 7,000</div>
                                                <div className="and">+ certificate and GFG swags!</div>
                                            </div>
                                            <div className="prizeCard">
                                                <div className="circle"></div>
                                                <div className="position">2ND RUNNER UP</div>
                                                <div className="prize">₹ 5,000</div>
                                                <div className="and">+ certificate and GFG swags!</div>
                                            </div>
                                            <div className="prizeCard">
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
                        

                        <div className="FourQuestionSection" id="themes" ref={themesSection}>
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
                                                Only projects that have been started AFTER the stipulated time ( Aug 6 2024 ) will be accepted.
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


                        <div className="FourQuestionSection">
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

                                    <CLink to="/events/project-expo/register">
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
                                            <div className="sponsorCard">GeeksForGeeks</div>
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
                                    <span>Sabari S - <a href="tel:+91 87546 05197">87546 05197</a> </span>
                                    <span>Navadeep Marella - <a href="tel:+91 70750 72880">70750 72880</a> </span>
                                    <span>Venkateswara Rao - <a href="tel:+91 93981 07277">93981 07277</a> </span>
                                    <span>Siri Chowdary - <a href="tel:+91 94911 46276">94911 46276</a> </span>
                                </div>
                                <div className="email">
                                    Or drop a mail to gfgkarestudentchapter@gmail.com
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        
                    </div>

                    <footer>
                        <div className="club">
                            With love, from GFG KARE
                        </div>
                    </footer>

                </div>
            
            </div>


        </>
        
    )
}