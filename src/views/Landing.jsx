import {  useState, useEffect, useRef } from "react";
import "../styles/Landing.scss";

// import { FaMapPin } from "react-icons/fa";
import { IoPin } from "react-icons/io5";
import { throttle } from "lodash"

// MINE
import Fade from "../components/Fade";

// IMAGES.
import kluTeam from "../assets/klu_team.jpg"
import gfgLogo from '../assets/gfgkare_square_logo.jpg';
// --------------------------------------------------------


// CLASS NAMES, VARIABLES SHOULD BE IN CAMEL CASE.

export default function Landing() {

    const fullScreenNav = useRef(null);

    const [direction, setDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);

    const scrollwithThrottle = throttle((e) => {
        const direction = prevScrollY < e.target.scrollTop ? 'down' : 'up';
        setPrevScrollY(e.target.scrollTop)
        setDirection(direction);
    }, 250);


    return (
        <div className="landing" onScroll={(e) => scrollwithThrottle(e)} >

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

        </div>
    )
}