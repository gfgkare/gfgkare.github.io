import "../styles/New.scss";

// import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Flickity from "react-flickity-component";

import ImageComp from "../components/ImageComp";

import coreTeamMembers from "../data/coreTeamInfo.js";
import { useMisc } from "../contexts/MiscContext";
import SectionDivider from "../components/SectionDivider";
import events from "../data/eventsInfo";

import kluTeam from "../assets/klu_team.jpg"

export default function New() {
    const { aboutRevealed, setAboutRevealed, teamRevealed, setTeamRevealed } =
        useMisc();

    const aboutSection = useRef();
    const [aboutVisible, setAboutVisible] = useState(false);

    const teamSection = useRef();
    const [teamVisible, setTeamVisible] = useState(false);
    
    const slideShow = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slideInterval, setSlideInterval] = useState();


    useEffect(() => {
        createAndSetNewSlideInterval();


        const aboutObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // alert("about above 50%")
                    aboutObserver.unobserve(aboutSection.current);
                    if (!aboutRevealed) {
                        setAboutVisible(true);
                        setTimeout(() => setAboutRevealed(true), 5000);
                    }
                }
            },
            { threshold: 0.85 }
        );
        if (!aboutRevealed) {
            aboutObserver.observe(aboutSection.current);
        } else {
            setAboutVisible(true);
        }

        const teamObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    teamObserver.unobserve(teamSection.current);
                    if (!teamRevealed) {
                        setTeamVisible(true);
                        setTimeout(() => setTeamRevealed(true), 1000);
                    }
                }
            },
            { threshold: 0.07 }
        );

        if (!teamRevealed) {
            teamObserver.observe(teamSection.current);
        } else {
            setTeamVisible(true);
        }

        return () => {
            // introObserver.disconnect();
            aboutObserver.disconnect();
            teamObserver.disconnect();
        };
    }, []);

    const createAndSetNewSlideInterval = () => {
        const moveSlideInterval = setInterval(() => {
            setCurrentSlideIndex((prevTimer) => {
                if (prevTimer < events.length - 1) {
                    document.querySelector(".flickity-button.next").click();
                    return prevTimer + 1;

                } else {
                    for (let i = 0; i < events.length - 1; i++) {
                        setTimeout(() => document.querySelector(".flickity-button.previous").click(), 300);
                    }
                    return 0;
                }
            });
        }, 8000);

        setSlideInterval(moveSlideInterval);
    };

    return (
        <>
            <div className="new">
                <section>
                    <div className="introDiv">
                        <div className="leftText">
                            <div className="head">
                                Join the Student Club that is revolutionizing
                                KARE
                            </div>
                            <div className="sub">
                                Work with the team of 11 amazing individuals who
                                are rocking the campus.
                            </div>

                            <div className="cta">Become a member</div>
                        </div>
                        <div className="imageContainer hideOnMobile">
                            <img src={kluTeam} alt="" />
                        </div>
                    </div>
                </section>

                <section ref={aboutSection}>
                    <div className={ (aboutVisible) ? "numbersDiv aboutVisible" : "numbersDiv"}>
                        <div className="shape hideOnMobile"></div>
                        <div className="text">
                            We are a team of aspiring students from Kalasalingam
                            University focused on making education and problem
                            solving accessible to students.
                        </div>

                        <div className="line hideOnMobile"></div>

                        <div className="numbers">
                            <div className="counter">
                                <span className="count">
                                    1000+
                                    {/* {!aboutRevealed ? (
                                        <CountUp
                                            start={101}
                                            end={1000}
                                            duration={6}
                                        />
                                    ) : (
                                        <>1000</>
                                    )}
                                    + */}
                                </span>
                                Students{"    "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    04+
                                    {/* 0
                                    {!aboutRevealed ? (
                                        <CountUp
                                            end={4}
                                            duration={10}
                                            delay={0.2}
                                        />
                                    ) : (
                                        <>4</>
                                    )}
                                    + */}
                                </span>
                                Talks{"   "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    05+
                                    {/* {!aboutRevealed ? (
                                        <CountUp
                                            end={5}
                                            duration={10}
                                            delay={0.2}
                                        />
                                    ) : (
                                        <>5</>
                                    )}
                                    + */}
                                </span>
                                Events
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider relativeWidth />

                <section className="teamSection">
                    <div className="teamTitle">Our Team</div>

                    <div className="teamGridContainer">
                        <div
                            className={`teamGrid ${
                                (teamVisible) ? "teamVisible" : (teamRevealed)  ? "teamVisible" : ""
                            }`}
                            ref={teamSection}
                        >
                            {Object.values(coreTeamMembers).map(
                                (member, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            className="noStyle"
                                            to={member.url}
                                        >
                                            <div
                                                className="memberContainer"
                                                key={member.name}
                                            >
                                                <div className="memberImage">
                                                    <img src={member.image} />
                                                </div>
                                                <div className="memberInfo">
                                                    <div className="name">
                                                        {member.name}
                                                    </div>
                                                    <div className="role">
                                                        {member.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </section>

                <div className="section events">
                <div className="sectionTitle">EVENTS</div>

                <Flickity
                    ref={slideShow}
                    className={"carousel"}
                    elementType={"div"}
                    options={{ initialIndex: 0 }}
                    disableImagesLoaded={false}
                >
                    {events.map((event, index) => {
                        return (
                            <div
                                className="eventSlide"
                                key={index}
                                onClick={(e) => {
                                    if (
                                        !e.target.parentElement.classList.contains(
                                            "is-selected"
                                        )
                                    ) {
                                        console.log(
                                            "clicked not selected event"
                                        );
                                        if (index < currentSlideIndex) {
                                            document
                                                .querySelector(
                                                    ".flickity-button.previous"
                                                )
                                                .click();
                                            setCurrentSlideIndex(
                                                (prevIndex) => prevIndex - 1
                                            );
                                        } else {
                                            document
                                                .querySelector(
                                                    ".flickity-button.next"
                                                )
                                                .click();
                                            setCurrentSlideIndex(
                                                (prevIndex) => prevIndex + 1
                                            );
                                        }
                                    } else {
                                        console.log("clicked selected event");
                                        navigate("/events/some-event");
                                    }
                                }}
                                // onMouseEnter={() => {
                                //     console.log("clearing slide interval");
                                //     clearInterval(slideInterval);
                                // }}
                                // onMouseLeave={() => {
                                //     createAndSetNewSlideInterval();
                                //     console.log("creating new slide interval");
                                // }}
                            >
                                <img src={event.imageSource} alt="" />
                                <div className="eventDetails">
                                    <div className="text">{event.text}</div>
                                </div>
                            </div>
                        );
                    })}

                </Flickity>
            </div>

                
            </div>
        </>
    );
}
