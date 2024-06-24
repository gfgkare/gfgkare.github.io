import {  useState, useEffect, useRef } from "react";
import "../styles/Landing.scss";

import useVerticalScrollDirection from "../hooks/useVerticalScrollDirection";

import gfgLogo from '../assets/gfgkare_square_logo.jpg';



// CLASS NAMES, VARIABLES SHOULD BE IN CAMEL CASE.

export default function Landing() {

    const fullScreenNav = useRef(null);
    const verticalScrollDirection = useVerticalScrollDirection();

    return (
        <div className="landing">

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

            <nav>
                <div className="logoContainer">
                    <img className="gfgLogo" src={gfgLogo} alt="Gfg Kare's logo"/>
                </div>

                <div className="rightMenu">
                    <button className="menuButton" onClick={() => fullScreenNav.current.classList.toggle("open")} >Menu</button>
                </div>
            </nav>


            <section className="fullScreenSection chapterIntro">
                <div className="bigText">
                    GFG KARE
                </div>
                <div className="subText">
                    We make the impossible possible through hardwork, teamwork, dedication, and a whole fuckin ton of coffee!
                    {
                        (verticalScrollDirection === "up") ? "going up" : "going down"
                    }
                </div>

            </section>

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