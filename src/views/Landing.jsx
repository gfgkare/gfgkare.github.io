import {  useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { throttle } from "lodash"
import { motion, useScroll, useTransform, spring } from 'framer-motion';

// Styles.
import "../styles/Landing.scss";

// React Icons.
import { IoPin } from "react-icons/io5";
import { FaRegCopyright, FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa"

// Custom.
import Fade from "../components/Fade";

// Images.
import kluTeam from "../assets/klu_team.jpg"
import gfgLogo from '../assets/gfgkare_square_logo.jpg';
// import gemoetricCircle from "../assets/floral_pattern.svg";
import gemoetricCircle from "../assets/geometric_circle.svg";
// --------------------------------------------------------


// CLASS NAMES, VARIABLES SHOULD BE IN CAMEL CASE.

export default function Landing() {

    const { scrollYProgress, scrollY } = useScroll();
    const [prevScrollY, setPrevScrollY] = useState(0);


    const rightCircleX = useTransform(scrollYProgress, [0, 1], ['55%', '-100%']);
    const leftCircleX = useTransform(scrollYProgress, [0, 1], ['-55%', '100%']);

    const fullScreenNav = useRef(null);
    
    const [pageLoading, setPageLoading] = useState(true);
    const [direction, setDirection] = useState('up');

    const scrollwithThrottle = throttle((e) => {
        const direction = prevScrollY < e.target.scrollTop ? 'down' : 'up';
        console.log(direction)
        setPrevScrollY(e.target.scrollTop)
        setDirection(direction);
    }, 250);

    const onAfterLoad = () => {
        setTimeout(() => setPageLoading(false), 500);
    }
    useEffect(()=>{
        window.addEventListener("load", onAfterLoad);
        return () => window.removeEventListener("load", onAfterLoad);
    },[])

    useEffect(() => {
        console.log(`Framer scroll changed: ${scrollY}`);
    }, [scrollY])


    return (
        <div className="landing" onScroll={(e) => scrollwithThrottle(e)} >

            {
                (pageLoading) ? (
                    <div className="loading">
                        Loading...
                    </div>
                ) : (
                    <>
                        <div className="fullScreenNav" ref={fullScreenNav} >
                            <button className="closeMenuButton" onClick={() => fullScreenNav.current.classList.remove("open")} >X</button>
                            <div className="fullScreenItemsContainer">
                                <div className="fullScreenItem">
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
                                </div>
                            </div>
                        </div>

                        <nav className={ (direction === "down") ? "nav hidden" : "nav shown" }>
                            <div className="logoContainer">
                                <img className="gfgLogo" src={gfgLogo} alt="Gfg Kare's logo"/>
                            </div>

                            <div className="rightMenu">
                                <button className="menuButton" onClick={() => fullScreenNav.current.classList.toggle("open")} >Menu</button>
                            </div>
                        </nav>
                        

                        <Fade delay={"1s"}>
                            <section className="fullScreenSection chapterIntro">

                                <motion.div
                                    className="circlePatternContainer left hideOnMobile"
                                    style={{ translateX: (leftCircleX) }}
                                >
                                    <img src={gemoetricCircle} loading="lazy" />
                                </motion.div>

                                <motion.div
                                    className="circlePatternContainer right hideOnMobile"
                                    style={{ translateX: (rightCircleX) }}
                                >
                                    <img src={gemoetricCircle} loading="lazy" />
                                </motion.div>

                                {/* 
                                <div className="outlineTextContainer">
                                    <div className="outlineText">
                                        GFG KARE
                                    </div>
                                    <div className="outlineText">
                                        GFG KARE
                                    </div>    
                                </div> */}

                                {/* ===================================================================================== */}

                                {/* ===================================================================================== */}

                                <div className="subText">Welcome to</div>
                                <div className="bigText textShine">
                                    GFG KARE
                                </div>
                                <div className="subText">
                                    We make the impossible possible through hardwork, teamwork, dedication, and a whole fuckin ton of coffee!
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
                            <div className="bigText">EVENTS</div>
                            <div className="subText">Everything we've done in the past year!</div>
                        </section>

                        <section className="fullScreenSection eventsDiv">

                        </section>

                        <section className="divider" id="team">
                            <div className="bigText">TEAM</div>
                            <div className="subText">The awesome people who make all of this happen!</div>
                        </section>

                        <section className="fullScreenSection eventsDiv">

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

                        </section>
                    </>
                )
            }

            

        </div>
    )
}