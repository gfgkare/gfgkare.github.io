import "../../styles/ProjectExpo.scss";


import { motion } from "framer-motion";
import CLink from "../../components/CLink";

import { BsChevronDoubleDown } from "react-icons/bs";
import { RiGroupFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineListAlt } from "react-icons/md";
import { IoTicket } from "react-icons/io5";

import gfgkareLogo from "../../assets/gfg_student_chapter_transparent.png"
import { useState, useRef } from "react";
import { Fade, AttentionSeeker, Slide } from "react-awesome-reveal";
import axios from "../../scripts/axiosConfig";
import { toast } from "react-toastify";

import healthcareImage from "../../assets/project-expo-stock-images/doctor.webp"
import fintechImage from "../../assets/project-expo-stock-images/fintech.jpg"
import agrotechImage from "../../assets/project-expo-stock-images/agrotech.webp"
import fitnessImage from "../../assets/project-expo-stock-images/fitness.png"
import blockchainImage from "../../assets/project-expo-stock-images/blockchain.webp"


import { useAuth } from "../../contexts/AuthContext";

export default function ProjectExpo() {

    const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();

    const whatSection = useRef();
    const themesSection = useRef();


    return (

        <div className="projectExpo">
            
            <nav className="nav">
                <div className="logo">
                    <CLink to={"/"}>
                        <img src={gfgkareLogo} />
                    </CLink>
                </div>

                <div className="profile">
                    {
                        (USER_PRESENT()) ? (
                            <CLink to={"/profile"}>
                                <img src={currentUser.photoURL} alt="" />
                            </CLink>
                        ) : (
                            <div onClick={() => signinwithpopup("google")}>Sign In</div>
                        )
                    }
                </div>
            </nav>

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
                            initial={{ x: "-250%" }} 
                            animate={{ x: "-10%" }} 
                            transition={{ duration: .25, delay: 1.75 }}
                        >
                            PROJECT
                        </motion.span>
                        <motion.span
                            initial={{ x: "+200%" }} 
                            animate={{ x: "40%" }} 
                            transition={{ duration: .25, delay: 1.75 }}
                        >
                            EXPO
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

                <div className="FourQuestionSection" id="detailed" ref={whatSection}  style={{ scrollMargin: "100px" }}>
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText red">
                                WHAT
                            </div>
                            <div className="subText">
                                IS PROJECT EXPO?
                            </div>
                        </div>
                        <Slide triggerOnce>
                            <div className="normalSectionText">
                                ProjectExpo is an inter-college event proudly hosted by GeeksForGeeks KARE Student Chapter. We invite you to <span className="color purple">showcase your innovative project and compete for the top prize.</span> Choose from a selection of captivating themes, develop a project, and present it to our esteemed panel. Impress us with your project's uniqueness, practical usability, and real-life application. The most exceptional teams will walk away with magnificent grand prizes.
                            </div>
                        </Slide>
                        
                    </Fade>
                    
                </div>

                <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText blue">
                                WHO
                            </div>
                            <div className="subText">
                                CAN JOIN?
                            </div>
                        </div>

                        <Slide direction="right" triggerOnce>
                            <div className="normalSectionText">
                                Project Expo welcomes participation from both <span className="color pink">undergraduate and postgraduate students from any institution </span> all over India. You can <span className="color yellow">join with team of two to four members.</span> Each participant is permitted to register only once and may be a member of only one team. This ensures fairness and integrity in the competition.
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
                                JOIN PROJECT EXPO?
                            </div>
                        </div>

                        <Slide triggerOnce>
                            <div className="normalSectionText">
                                Project Expo offers knowledge, mentorship, recognition, and competition. Participants receive mentorship to refine their projects, ensuring they are practical and impactful. Showcase your work to gain recognition and compete for grand prizes. With a <span className="color pink">prize pool of over Rs. 20,000</span>, the competition is fierce, and the rewards are substantial. Join now to learn, grow, and win big.
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


                 <div className="FourQuestionSection">
                    <Fade cascade damping={.1} triggerOnce>
                        <div className="sectionTitleText">
                            <div className="bigText orange">
                                PRIZES
                            </div>
                            {/* <div className="subText">
                            </div> */}
                        </div>
                        <div className="normalSectionText">
                            <Slide className="prizesContainer" triggerOnce>
                                <div className="prizeCard first">
                                    
                                </div>
                            </Slide>
                        </div>
                    </Fade>
                    
                </div>
                
                
                <Fade>
                    <div className="actionButtonContainer">
                        <a href="#themes">
                            <button className="actionButton" onClick={() => themesSection?.current.scrollIntoView()}>
                            <BsChevronDoubleDown size={"40px"} />
                            PICK A THEME!
                        </button>
                        </a>
                        
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
                                    <div className="card healthcare">Healthcare</div>
                                    <div className="card fintech">FinTech</div>
                                    <div className="card agrotech">AgroTech</div>
                                    <div className="card fitness">Fitness and Sports</div>
                                    <div className="card blockchain">BlockChain</div>
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
                                        This fee covers the registration, allotment, mentorship, refreshments and the ticket for the offline presentation.
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

                            <CLink to="/events/project-expo/register">
                                <button>GO TO REGISTER PAGE!</button>
                            </CLink>
                        </div>

                        
                    </Fade>
                    
                </div>

                <div className="faq"></div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText">
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
    )
}