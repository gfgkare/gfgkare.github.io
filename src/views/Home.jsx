import "../styles/Home.scss";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import kluTeam from "../assets/klu_team.jpg";
import gfgLogo from "../assets/GFG_KARE.svg";

import ImageComp from "../components/ImageComp";
import SectionDivider from "../components/SectionDivider";

import { useMisc } from "../contexts/MiscContext";

import coreTeamMembers from "../data/coreTeamInfo.js";
import events from "../data/eventsInfo";

// import "react-slideshow-image/dist/styles.css";

import Flickity from "react-flickity-component";

export default function Main() {
    const {
        aboutRevealed,
        setAboutRevealed,
        teamRevealed,
        setTeamRevealed,
        setNavTitle,
    } = useMisc();

    const [aboutVisible, setAboutVisible] = useState(false);
    const [teamVisible, setTeamVisible] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slideInterval, setSlideInterval] = useState();

    const introSection = useRef(null);
    const aboutSection = useRef(null);
    const teamSection = useRef(null);
    const slideShow = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        createAndSetNewSlideInterval();

        const introObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setNavTitle("");
            } else {
                setNavTitle("GFG KARE STUDENT CHAPTER");
            }
        });

        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // alert(entries)
                if (!aboutRevealed) {
                    setAboutVisible(true);
                    setTimeout(() => setAboutRevealed(true), 5000);
                }
                aboutObserver.unobserve(aboutSection.current);
            }
        });

        const teamObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!teamRevealed) {
                    setTeamVisible(true);
                    setTimeout(() => setTeamRevealed(true), 1000);
                }
                teamObserver.unobserve();
            }
        });

        introObserver.observe(introSection.current);

        if (!aboutRevealed) {
            aboutObserver.observe(aboutSection.current);
        } else {
            setAboutVisible(true);
        }

        if (!teamRevealed) {
            teamObserver.observe(teamSection.current);
        } else {
            setTeamVisible(true);
        }

        return () => {
            introObserver.disconnect();
            aboutObserver.disconnect();
            teamObserver.disconnect();
            clearInterval(slideInterval);
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
            <div className="section intro" ref={introSection}>
                <div className="name">GeeksForGeeks Student Chapter</div>
                <div className="inst">KARE</div>
            </div>
            <SectionDivider
                showDownButton
                onClick={() =>
                    aboutSection.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
            />

            <div
                className={`section about ${
                    aboutVisible ? "aboutVisible" : ""
                }`}
            >
                <div className="titleAndContent">
                    <div className="title sectionTitle" ref={aboutSection}>
                        WHO ARE WE
                    </div>
                    <div className="content">
                        We are a team of aspiring students from Kalasalingam
                        University focused on making programming and problem
                        solving accessible to students that want
                        to improve themselves in the fields of programming and
                        computer science.
                        <br /> <br />
                        <span className="hideOnMobile">
                            We do this with the help of GeeksForGeeks, Kalasalingam Academy of Research and Education, and enthusiastic students!
                        </span>
                    </div>
                    {aboutVisible ? (
                        <div className="numbers">
                            <div className="counter">
                                <span className="count">
                                    {!aboutRevealed ? (
                                        <CountUp end={1000} duration={6} />
                                    ) : (
                                        <>1000</>
                                    )}
                                    +
                                </span>
                                Students{"    "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    0
                                    {!aboutRevealed ? (
                                        <CountUp
                                            end={4}
                                            duration={10}
                                            delay={0.2}
                                        />
                                    ) : (
                                        <>4</>
                                    )}
                                    +
                                </span>
                                Guest Talks{"   "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    0
                                    {!aboutRevealed ? (
                                        <CountUp
                                            end={5}
                                            duration={10}
                                            delay={0.2}
                                        />
                                    ) : (
                                        <>5</>
                                    )}
                                    +
                                </span>
                                Events Conducted
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="imageContainer ">
                    <div className="image">
                        {/* <img src={kluTeam} alt="GFG Team at KLU" /> */}
                        <ImageComp
                            src={kluTeam}
                            alt="GFG Team at KLU"
                            text={
                                <>
                                    Image taken after event GFG Summer Carnival!{" "}
                                    <Link to="/events/gfg_summer_carnival">
                                        Go to event
                                    </Link>{" "}
                                </>
                            }
                        />
                    </div>
                </div>
            </div>

            <SectionDivider />

            <div className={"section team"}>
                <div className="sectionTitle">MEET OUR TEAM</div>

                <div className="teamGridContainer">
                    <div
                        className={`teamGrid ${
                            teamVisible ? "teamVisible" : ""
                        }`}
                        ref={teamSection}
                    >
                        {Object.values(coreTeamMembers).map((member, index) => {
                            return (
                                <Link
                                    key={index}
                                    className="noStyle"
                                    to={member.url}
                                >
                                    <div
                                        className="memberContainer"
                                        key={member.name}
                                        // onClick={() => navigate(member.url)}
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
                        })}

                        {/* <div className="memberContainer">
                            <div className="memberImage">
                            <img src={vineethImg} />
                            </div>
                            <div className="memberInfo">
                                <div className="name">
                                    Krishna Vineeth
                                </div>
                                <div className="title">
                                    Vice Chair Person
                                </div>
                            </div>
                        </div> */}

                        {/* {members.value.map((member) => {
                            return (
                                <div className="memberContainer">
                                    <ImageComp
                                        className="memberImage"
                                        src={member.image}
                                    />
                                    <div className="memberInfo">
                                        <div className="title">
                                            <div className="name">
                                                {member.name}
                                            </div>
                                            <div className="role">
                                                {member.role}
                                            </div>
                                        </div>
                                        <div className="words">
                                            {member.about}
                                        </div>
                                        <div className="links">
                                            <button className="moreInfo">
                                                MORE INFO
                                            //</button>
                                            //<button>More Info</button>
                                            //<button>ig</button>
                                            //<button>li</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })} */}

                        {/* <div className="memberContainer">
                            <ImageComp className="memberImage" src={ashokImg} />
                            <div className="memberInfo">
                                <div className="title">
                                    <div className="name">Ashok Reddy</div>
                                    <div className="role">Chair Person</div>
                                </div>
                                <div className="words">
                                    A talented person surely capable of building
                                    an army for world peace.
                                </div>
                                <div className="links">
                                    {/* <button>More Info</button>
                                    <button>ig</button>
                                    <button>li</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <SectionDivider />

            <a name="#events"></a>
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
                                        navigate(event.url || "/events/some-event");
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

                    {/* <div className="eventSlide">
                        <img src={talkEvent} alt="" />
                        <div className="eventDetails">
                            <div className="text">
                                Clicking the card will open event specific page.
                            </div>
                        </div>
                    </div> */}

                    {/* <ImageComp
                        src={vineethImg}
                        alt="GFG Team at KLU"
                        text={
                            <>
                                Image taken after event GFG Summer Carnival!{" "}
                                <Link to="/events/gfg_summer_carnival">
                                    Go to event
                                </Link>{" "}
                            </>
                        }
                    />
                    <ImageComp
                        src={jagdeeshImg}
                        alt="GFG Team at KLU"
                        text={
                            <>
                                Image taken after event GFG Summer Carnival!{" "}
                                <Link to="/events/gfg_summer_carnival">
                                    Go to event
                                </Link>{" "}
                            </>
                        }
                    />
                    <ImageComp
                        src={vivekImg}
                        alt="GFG Team at KLU"
                        text={
                            <>
                                Image taken after event GFG Summer Carnival!{" "}
                                <Link to="/events/gfg_summer_carnival">
                                    Go to event
                                </Link>{" "}
                            </>
                        }
                    /> */}
                    {/* <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} /> */}
                </Flickity>
            </div>

            <div className="footer">
                <div>
                <span className="chapterTitle">
                    <img src={gfgLogo} style={ {height: "40px", width: "40px"} } />
                    <span>GFG KARE Student Chapter</span>
                </span>

                <a href="/events">
                    Events
                </a>

                <a href="/members">
                    Members
                </a>

                <a href="/contact">
                    Contact
                </a>
                </div>

            </div>
        </>
    );
}
