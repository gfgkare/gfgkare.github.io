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
import { useState } from "react";

export default function ProjectExpo() {

    const [numberOfMembers, setNumberOfMembers] = useState(4);

    return (

        <div className="projectExpo">
            
            <nav className="nav">
                <div className="logo">
                    <CLink to={"/"}>
                        <img src={gfgkareLogo} />
                    </CLink>
                </div>

                <div className="profile">
                    Sign In
                </div>
            </nav>

            <div className="content">
                <div className="heroDiv">
                    <div className="gfgKarePresents">
                        <span className="title">
                            GFG KARE
                        </span>
                        <span className="presents">
                            PRESENTS
                        </span>
                    </div>
                    
                    <div className="projectExpoText">
                        <motion.span 
                            initial={{ x: "-100%" }} 
                            animate={{ x: "-10%" }} 
                        >
                            PROJECT
                        </motion.span>
                        <motion.span
                            initial={{ x: "+100%" }} 
                            animate={{ x: "40%" }} 
                        >
                            EXPO
                        </motion.span>
                    </div>
                </div>
                
                <div className="actionButtonContainer">
                    <button className="actionButton">
                        <BsChevronDoubleDown size={"40px"} />
                        LET'S GO!
                    </button>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText red">
                            WHAT
                        </div>
                        <div className="subText">
                            IS PROJECT EXPO?
                        </div>
                    </div>
                    <div className="normalSectionText">
                        ProjectExpo is an inter-college event proudly hosted by GeeksForGeeks KARE Student Chapter. We invite you to <span className="color purple">showcase your innovative project and compete for the top prize.</span> Choose from a selection of captivating themes, develop a project, and present it to our esteemed panel. Impress us with your project's uniqueness, practical usability, and real-life application. The most exceptional teams will walk away with magnificent grand prizes.
                    </div>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText blue">
                            WHO
                        </div>
                        <div className="subText">
                            CAN JOIN?
                        </div>
                    </div>

                    <div className="normalSectionText">
                        Project Expo welcomes participation from both <span className="color pink">undergraduate and postgraduate students from any institution </span> all over India. You can <span className="color yellow">join individually or form a team of up to four members.</span> Each participant is permitted to register only once and may be a member of only one team. This ensures fairness and integrity in the competition.
                    </div>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText green">
                            WHY
                        </div>
                        <div className="subText">
                            JOIN PROJECT EXPO?
                        </div>
                    </div>
                    <div className="normalSectionText">
                        Project Expo offers knowledge, mentorship, recognition, and competition. Participants receive mentorship to refine their projects, ensuring they are practical and impactful. Showcase your work to gain recognition and compete for grand prizes. With a <span className="color pink">prize pool of over Rs. 20,000</span>, the competition is fierce, and the rewards are substantial. Join now to learn, grow, and win big.
                    </div>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText yellow">
                            WHERE
                        </div>
                        <div className="subText">
                            IS PROJECT EXPO HAPPENING!?
                        </div>
                    </div>
                    <div className="normalSectionText">
                        Project Expo is happening in the prestigious <span className="color cyan">Kalasalingam University in Krishnankoil, Tamil Nadu.</span> The event will be held in the university's state-of-the-art facilities, providing participants with a conducive environment to present their projects. The offline presentation will be held on <span className="color green">September 6, 2024</span>, and the winners will be announced on the same day.
                    </div>
                </div>


                 <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText orange">
                            PRIZES
                        </div>
                        {/* <div className="subText">
                        </div> */}
                    </div>
                    <div className="normalSectionText">
                        1st prize - 10000
                        2nd prize - 5000
                        3rd prize - 3000
                    </div>
                </div>
                
                
                <div className="actionButtonContainer">
                    <button className="actionButton">
                        <BsChevronDoubleDown size={"40px"} />
                        PICK A THEME!
                    </button>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText purple">
                            THEMES
                        </div>
                    </div>

                    <div className="normalSectionText">

                        <div className="themesGrid">
                            <div className="card">Healthcare</div>
                            <div className="card">FinTech</div>
                            <div className="card">AgroTech</div>
                            <div className="card">Fitness and Sports</div>
                            <div className="card">BlockChain</div>
                        </div>
                    </div>
                </div>

                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText magenta">
                            RULES
                        </div>
                        <div className="subText">
                            tehse are the rules.
                        </div>
                    </div>

                    <div className="normalSectionText">
                        <div className="rulesList">
                            <div className="rule">
                                <div className="icon">
                                    <RiGroupFill size={"25px"} />
                                </div>
                                <div className="text">
                                    Team of 4 people
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
                                The projects should strictly align with any of the given thenes.

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
                                The registration fee of Rs. 500 (for the whole team) should be paid to complete the registration.
                                This fee covers the registration, allotment, mentorship, refreshments and the ticket for the offline presentation.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>


                <div className="FourQuestionSection">
                    <div className="sectionTitleText">
                        <div className="bigText">
                            REGISTER
                        </div>
                    </div>

                    <div className="normalSectionText">
                        <form className="registrationForm">
                            <div className="formGroup">
                                <label htmlFor="teamName">Team Name:</label>
                                <input type="text" id="teamName" name="teamName" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="numberOfMembers">Number of Members:</label>
                                <select id="numberOfMembers" name="numberOfMembers" onChange={(e) => setNumberOfMembers(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            {[...Array(Number(numberOfMembers))].map((_, index) => (
                                <div className="formGroup" key={index}>
                                    <label htmlFor={`memberName${index + 1}`}>Member {index + 1} Name:</label>
                                    <input type="text" id={`memberName${index + 1}`} name={`memberName${index + 1}`} />
                                    <label htmlFor={`memberEmail${index + 1}`}>Member {index + 1} Email:</label>
                                    <input type="email" id={`memberEmail${index + 1}`} name={`memberEmail${index + 1}`} />
                                </div>
                            ))}
                            <div className="formGroup">
                                <label htmlFor="theme">Theme:</label>
                                <select id="theme" name="theme">
                                    <option value="1">Theme 1</option>
                                    <option value="2">Theme 2</option>
                                    <option value="3">Theme 3</option>
                                    <option value="4">Theme 4</option>
                                </select>
                            </div>
                            <div className="payment">
                                <button>Pay 500</button>
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
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
                        <ul>
                            <li>Sabari - 87546 05197</li>
                        </ul>
                    </div>
                    
                </div>
                
            </div>

            <footer>Made with love by GFG KARE.</footer>

        </div>
    )
}