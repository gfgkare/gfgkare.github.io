import {  useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { throttle } from "lodash"
import { motion, useScroll } from 'framer-motion';

// Styles.
import "../styles/Landing.scss";

// React Icons.
import { IoPin } from "react-icons/io5";
import { FaRegCopyright, FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa"

// Custom.
import CLink from "../components/CLink";
import Fade from "../components/Fade";
// import RollingLetters from "../components/RollingLetters"
import RocketIntro from "../components/RocketIntro";
import ScrollContainer from "../components/ScrollContainer";

// Images.
import eventPlaceholderImage from "../assets/pinkAndWhiteMovement.gif"
import kluTeam from "../assets/klu_team.jpg"
import gfgLogo from '../assets/gfg_student_chapter_transparent.png';
// import gemoetricCircle from "../assets/geometric_circle.svg";
import elem1 from "../assets/landing_page_elements/elem1.svg";
import elem2 from "../assets/landing_page_elements/elem2.svg";
import elem3 from "../assets/landing_page_elements/elem3.svg";
import elem4 from "../assets/landing_page_elements/elem4.svg";
// --------------------------------------------------------


// CLASS NAMES, VARIABLES SHOULD BE IN CAMEL CASE.


const items = [
    { id: 1, color: '#FF6B6B' },
    { id: 2, color: '#4ECDC4' },
    { id: 3, color: '#45B7D1' },
    { id: 4, color: '#F7DC6F' },
    { id: 5, color: '#E74C3C' },
    { id: 6, color: '#3498DB' },
];

export default function Landing() {
    
    const navigate = useNavigate();
    const { scrollYProgress, scrollY } = useScroll();

    // const rightCircleX = useTransform(scrollYProgress, [0, 0.5], ['55%', '-100%']);
    // const leftCircleX = useTransform(scrollYProgress, [0, 0.5], ['-55%', '100%']);

    // const rightCircleRotation = useTransform(scrollYProgress, [0, 0.25], ['0deg', '-360deg']);
    // const leftCircleRotation = useTransform(scrollYProgress, [0, 0.25], ['0deg', '360deg']);

    const fullScreenNav = useRef(null);
    
    const [pageLoading, setPageLoading] = useState(true);
    const [direction, setDirection] = useState('up');
    const [rocketAnimationOver, setRocketAnimationOver] = useState(false);

    const onAfterLoad = () => {
        setTimeout(() => setRocketAnimationOver(true), 500);
        setTimeout(() => setPageLoading(false), 1000 );
    }

    useEffect(() => {
        window.addEventListener("load", onAfterLoad);
        
        let oldScrollY = 0

        scrollY.on("change", throttle((latestValue) => {
            console.log( ( oldScrollY < latestValue ) ? "down" : "up" );

            setDirection(( oldScrollY < latestValue ) ? "down" : "up");
            oldScrollY = latestValue;
        }, 600) );

        // setTimeout(() => {
        //     setRocketAnimationOver(true);
        // }, 2000);

        // setTimeout(() => {
        //     setPageLoading(false);
        // }, 3000)

        return () =>{ 
            window.removeEventListener("load", onAfterLoad);
            scrollY.clearListeners()
        }
    },[])


    return (
        <div className={`landing ${(pageLoading) && 'loading'}`}>

            {
                (pageLoading) && (
                    <div className="loading">
                        <RocketIntro animationOver={rocketAnimationOver} word={"GFGKARE"} />
                    </div>
                )
            }

            <ScrollContainer>
                <div className="fullScreenNav" ref={fullScreenNav} >
                    <button className="closeMenuButton" onClick={() => fullScreenNav.current.classList.remove("open")} >X</button>
                    <div className="fullScreenItemsContainer">
                        <div className="fullScreenItem">
                            <CLink to="/events/prajnotsavah">Prajnotsavah 2K24</CLink>
                        </div>
                        {/* <div className="fullScreenItem">
                            <a href="#about" onClick={() => fullScreenNav.current.classList.remove("open")}>About</a>
                        </div>
                        <div className="fullScreenItem">
                            <a href="#events" onClick={() => fullScreenNav.current.classList.remove("open")}>Events</a>
                        </div>
                        <div className="fullScreenItem">
                            <a href="#team" onClick={() => fullScreenNav.current.classList.remove("open")}>Team</a>
                        </div>
                        <div className="fullScreenItem">
                            <a href="#contact" onClick={() => fullScreenNav.current.classList.remove("open")}>Contact</a>
                        </div> */}
                    </div>
                </div>

                <nav className={"nav"}>
                    <div className="logoContainer">
                        <img className="gfgLogo" src={gfgLogo} alt="Gfg Kare's logo"/>
                        {/* <span className="gfgText">GFG KARE</span> */}
                    </div>

                    <div className="rightMenu">
                        <button onClick={() => navigate("/events/prajnotsavah")} className="prajnotsavahButton">Prajnotsavah</button>
                        <button className="menuButton" onClick={() => fullScreenNav.current.classList.toggle("open")} >Menu</button>
                    </div>
                </nav>
                

                <Fade delay={".5s"}>
                    <section className="fullScreenSection chapterIntro">
                        <motion.img 
                            className="landingPageElement" 
                            src={elem1}
                            initial={{ bottom: "0", left: "20%" }}
                            animate={{ bottom: "30%" }}
                            transition={{ type: "spring", stiffness: 70 }}
                        />
                        <motion.img 
                            className="landingPageElement" 
                            src={elem2}
                            initial={{ bottom: "0", left: "40%", animationDuration: "1s" }}
                            animate={{ bottom: `70%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                        />
                        <motion.img 
                            className="landingPageElement" 
                            src={elem3}
                            initial={{ bottom: "0", left: "65%", animationDuration: "1s" }}
                            animate={{ bottom: `66%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                        />
                        <motion.img 
                            className="landingPageElement" 
                            src={elem4}
                            initial={{ bottom: "0", left: "80%", animationDuration: "1s" }}
                            animate={{ bottom: `50%`, left: "85%" }}
                            transition={{ type: "spring", stiffness: 100 }}
                        />

                        <div className="subText">We are</div>
                        <div className="bigText textShine">
                            GFG KARE
                        </div>
                        <div className="subText">
                            <div>
                                We are a student chapter backed by GeeksForGeeks at Kalasalingam University.
                                Over the past year we have hosted 15+ events with flagship ones
                                such as Algorithmist, Geekfest and tons of other insightful workshops!
                            </div>
                            <div>We achieve this through hardwork, a passion to help students and unholy amounts of coffee!</div>
                        </div>

                        <div className="cardsContainer">
                            <div className="card">
                                <div className="pin"><IoPin size={"25px"} /></div>
                                <div className="cardContent">
                                    <div className="cardImage">
                                        <img src={kluTeam} alt="" />
                                    </div>
                                    <div className="cardText">
                                        06/09/2022
                                    </div>
                                </div>
                            </div>
                            <div className="card hideOnMobile">
                                <div className="pin"><IoPin size={"25px"} /></div>
                                <div className="cardContent">
                                    <div className="cardImage">
                                        <img src={kluTeam} alt="" />
                                    </div>
                                    <div className="cardText">
                                        06/09/2022
                                    </div>
                                </div>
                            </div>
                            <div className="card hideOnMobile">
                                <div className="pin"><IoPin size={"25px"} /></div>
                                <div className="cardContent">
                                    <div className="cardImage">
                                        <img src={kluTeam} alt="" />
                                    </div>
                                    <div className="cardText">
                                        06/09/2022
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="pin"><IoPin size={"25px"} /></div>
                                <div className="cardContent">
                                    <div className="cardImage">
                                        <img src={kluTeam} alt="" />
                                    </div>
                                    <div className="cardText">
                                        06/09/2022
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rightBottomMenu">
                            <Fade>
                                <div className="linksContainer">
                                    <Link to="https://in.linkedin.com/company/gfg-kare-student-chapter" className="linkBox" target="_blank">
                                        <FaLinkedin size={"30px"} />
                                    </Link>
                                    <Link to="https://www.instagram.com/gfgkare" className="linkBox" target="_blank">
                                        <FaInstagram size={"30px"} />
                                    </Link>
                                    <Link to="https://www.youtube.com/@GFGKARE" className="linkBox" target="_blank">
                                        <FaYoutube size={"30px"} />
                                    </Link>
                                    <Link to="https://www.github.com/gfgkare" className="linkBox" target="_blank">
                                        <FaGithub size={"30px"} />
                                    </Link>
                                </div>

                                <div className="copyrightInfo hideOnMobile">
                                    <FaRegCopyright /> 2024
                                </div>
                            </Fade>
                        </div>

                    </section>
                </Fade>
                

                <section className="divider" id="events">
                    <div className="bigText">PRAJNOTSAVAH 2K24</div>
                    <div className="subText">Our newest event!</div>
                </section>

                <section className="fullScreenSection prajnotsavahDiv">
                    <div className="prajnotsavahContainer">
                        <div className="prajnotsavahText">
                            <div className="prajnotsavahTitle">Prajnotsavah 2K24</div>
                            <div className="prajnotsavahDate">Nov 8 2024</div>
                            <div className="prajnotsavahDescription">
                                Prajnotsavah is an inter-college project expo conducted by GFG KARE.
                                It is a platform for students to showcase their projects and ideas.
                            </div>
                            <div className="prajnotsavahButton">
                                <CLink to={"/events/prajnotsavah"}>Learn More</CLink>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="fullScreenSection eventsDiv">
                    <div className="eventsContainer">

                        <div className="eventNamesContainer">
                            <CLink className="event" to={"/events/algo2024"} >
                                <div className="title">Algorithmist '24</div>
                                <div className="date">Oct '23 - Feb '24</div>
                            </CLink>
                            <CLink className="event" to={"/events/algo2024"} >
                                <div className="title">Algorithmist '24</div>
                                <div className="date">Oct '23 - Feb '24</div>
                            </CLink>
                            <CLink className="event" to={"/events/algo2024"} >
                                <div className="title">Algorithmist '24</div>
                                <div className="date">Oct '23 - Feb '24</div>
                            </CLink>
                            <CLink className="event" to={"/events/algo2024"} >
                                <div className="title">Algorithmist '24</div>
                                <div className="date">Oct '23 - Feb '24</div>
                            </CLink>
                            <CLink className="event" to={"/events/algo2024"} >
                                <div className="title">Algorithmist '24</div>
                                <div className="date">Oct '23 - Feb '24</div>
                            </CLink>
                        </div>
                        <div className="eventCanvas">
                            <div className="eventCard">
                                <img src={eventPlaceholderImage} alt="" />
                            </div>
                        </div>

                    </div>

                    

                </section>

                <section className="divider" id="team">
                    <div className="bigText">TEAM</div>
                    <div className="subText">The awesome people who make all of this happen!</div>
                </section>

                <section className="fullScreenSection eventsDiv">

                <div className="grid-container">
                    {items.map((item) => (
                        <div key={item.id} className={`grid-item item-${item.id}`} style={{ backgroundColor: item.color }}>
                        Item {item.id}
                        </div>
                    ))}
                </div>

                </section>

                <section className="divider" id="projects">
                    <div className="bigText">PROJECTS</div>
                    <div className="subText">Incredible projects that exist because of GFG KARE!</div>
                </section>

                <section className="fullScreenSection eventsDiv">

                </section>

                <section className="divider" id="articles">
                    <div className="bigText">ARTICLES</div>
                    <div className="subText">Articles written by our members!</div>
                </section>

                <section className="fullScreenSection eventsDiv">

                </section>


                <section className="divider" id="contact">
                    <div className="bigText">CONTACT</div>
                    <div className="subText">Get in touch!</div>
                </section>

                <section className="fullScreenSection eventsDiv">

                </section> */}
            </ScrollContainer>
            

        </div>
    )
}