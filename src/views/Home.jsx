import "../styles/Home.scss";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import kluTeam from "../assets/klu_team.jpg";

import ashokImg from "../assets/ashok.jpg";
import balajiImg from "../assets/balaji.jpg";
import jagdeeshImg from "../assets/jagdeesh.jpg";
import jayasriImg from "../assets/jayasri.jpg";
import vineethImg from "../assets/vineeth.jpg";
import vivekImg from "../assets/vivek.jpg";
import kluBgBlurred from "../assets/klu_bg_blurred.jpg";

import ImageComp from "../components/ImageComp";
import SectionDivider from "../components/SectionDivider";
import useArray from "../hooks/useArray";

// import Carousel from "../components/Carousel";

// import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import Flickity from "react-flickity-component";

const slideImages = [
    {
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 1",
    },
    {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: "Slide 2",
    },
    {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 3",
    },
];

export default function Main() {
    const [aboutVisible, setAboutVisible] = useState(false);
    const [teamVisible, setTeamVisible] = useState(false);
    const aboutSection = useRef(null);
    const teamSection = useRef(null);

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const members = useArray([
        {
            name: "Ashok Reddy",
            role: "Chair Person",
            about: "A talented person surely capable of building an army for world peace.",
            image: ashokImg,
        },
        {
            name: "Krishna Vineeth",
            role: "Vice Chair Person",
            about: "A talented person surely capable of building an army for world peace.",
            image: vineethImg,
        },
        {
            name: "N Balaji",
            role: "Graphic Designer",
            about: "A talented person surely capable of building an army for world peace.",
            image: balajiImg,
        },
        {
            name: "Jayasri",
            role: "Content Writer",
            about: "A talented person surely capable of building an army for world peace.",
            image: jayasriImg,
        },
        {
            name: "Vivek",
            role: "Marketing Head",
            about: "A talented person surely capable of building an army for world peace.",
            image: vivekImg,
        },
        {
            name: "Vivek",
            role: "Marketing Head",
            about: "A talented person surely capable of building an army for world peace.",
            image: vivekImg,
        },
        {
            name: "Ashok Reddy",
            role: "Chair Person",
            about: "A talented person surely capable of building an army for world peace.",
            image: ashokImg,
        },
        {
            name: "Krishna Vineeth",
            role: "Vice Chair Person",
            about: "A talented person surely capable of building an army for world peace.",
            image: vineethImg,
        },
        {
            name: "N Balaji",
            role: "Graphic Designer",
            about: "A talented person surely capable of building an army for world peace.",
            image: balajiImg,
        },
        {
            name: "Jayasri",
            role: "Content Writer",
            about: "A talented person surely capable of building an army for world peace.",
            image: jayasriImg,
        },
        {
            name: "Jagadeesh Siddhireddy",
            role: "Marketing Head",
            about: "A talented person surely capable of building an army for world peace.",
            image: vivekImg,
        },
    ]);

    useEffect(() => {
        const prev = document.querySelector(
            ".previous"
        );
        const next = document.querySelector(
            ".next"
        );

        // let moveSlide = setInterval(() => {
        //     console.log("Moving slides")
        //     if (currentSlideIndex >= 2) {
        //         console.log("Back to zero")
        //         setCurrentSlideIndex(0);

        //         // for (let i = 0; i < 3 - 1; i++) {
        //         //     // prev.click();
        //         //     setCurrentSlideIndex(0);
        //         // }
        //     } else {
        //         console.log("Going next ")
        //         setCurrentSlideIndex((currentSlideIndex) => currentSlideIndex + 1);
        //         // next.click();
        //     }

        //     console.log(currentSlideIndex)

        // }, 2000);

        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                alert(entries)
                setAboutVisible(true);
                aboutObserver.unobserve(aboutSection.current);
            }
        });

        const teamObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTeamVisible(true);
                teamObserver.unobserve();
            }
        });

        aboutObserver.observe(aboutSection.current);
        teamObserver.observe(teamSection.current);

        return () => {
            aboutObserver.disconnect();
            teamObserver.disconnect();
            // clearInterval(moveSlide);
        };
    }, []);

    return (
        <>
            <div className="section intro">
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
                    <div className="title sectionTitle">WHO ARE WE</div>
                    <div className="content" ref={aboutSection}>
                        We are a team of aspiring students from Kalasalingam
                        University focused on making education and problem
                        solving yada yada yada accessible to students that want
                        to improve themselves in the fields of programming and
                        computer science.
                        <br /> <br />
                        <span className="hideOnMobile">
                            Some other extra info that will be hid in mobile
                            view. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Earum voluptatum incidunt
                            voluptates quae praesentium aut molestiae ea quo
                            nobis consequatur!
                        </span>
                    </div>
                    {aboutVisible ? (
                        <div className="numbers">
                            <div className="counter">
                                <span className="count">
                                    <CountUp end={1000} duration={4} />+
                                </span>
                                Students{"    "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    0
                                    <CountUp
                                        end={4}
                                        duration={10}
                                        delay={0.1}
                                    />
                                    +
                                </span>
                                Guest Talks{"   "}
                            </div>

                            <div className="counter">
                                <span className="count">
                                    0
                                    <CountUp
                                        className="count"
                                        end={5}
                                        duration={10}
                                        delay={1}
                                    />
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
                        {members.value.map((member) => {
                            return (
                                <div className="memberContainer">
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

            <div className="section events">
                <div className="sectionTitle">EVENTS</div>

                <Flickity
                    className={"carousel"} // default ''
                    elementType={"div"} // default 'div'
                    options={{ initialIndex: 0 }} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    // reloadOnUpdate // default false
                    // static // default false
                    infinite
                >
                    {/* <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div>

                    <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div>

                    <div className="slide">
                        <img src={kluBgBlurred} alt="" />
                        <div className="title">Slide</div>
                    </div> */}
                    <ImageComp
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
                    />
                    {/* <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} />
                    <img src={kluBgBlurred} /> */}
                </Flickity>
            </div>

            <div className="footer">
            © KARE GeeksForGeeks Student Chapter (2023) 
            </div>
        </>
    );
}
