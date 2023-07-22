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

import ImageComp from "../components/ImageComp";
import SectionDivider from "../components/SectionDivider";
import useArray from "../hooks/useArray";

export default function Main() {
    const [visible, setVisible] = useState(false);

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
            role: "Social",
            about: "A talented person surely capable of building an army for world peace.",
            image: jayasriImg,
        },
        {
            name: "Vivek",
            role: "Events Organizing Head",
            about: "A talented person surely capable of building an army for world peace.",
            image: vivekImg,
        },
        {
            name: "Vivek",
            role: "Events Organizing Head",
            about: "A talented person surely capable of building an army for world peace.",
            image: vivekImg,
        },
    ]);

    const aboutSection = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                observer.unobserve(aboutSection.current);
            }
        });

        observer.observe(aboutSection.current);

        return () => observer.disconnect();
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
                className={`section about ${visible ? "visible" : ""}`}
                ref={aboutSection}
            >
                <div className="titleAndContent">
                    <div className="title sectionTitle">WHO ARE WE</div>
                    <div className="content">
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
                    {visible ? (
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

            <div className="section team">
                <div className="sectionTitle">MEET OUR TEAM</div>

                <div className="teamGridContainer">
                    <div className="teamGrid">
                        {members.value.map((member) => {
                            return (<div className="memberContainer">
                                <div className="memberImage">
                                    <img src={member.image} />
                                </div>
                                <div className="memberInfo">
                                    <div className="name">{member.name}</div>
                                    <div className="role">{member.role}</div>
                                </div>
                            </div>);
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
        </>
    );
}
