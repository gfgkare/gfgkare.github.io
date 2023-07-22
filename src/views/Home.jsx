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

export default function Main() {
    const [visible, setVisible] = useState(false);

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
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={ashokImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={vineethImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={balajiImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={jayasriImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={jagdeeshImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                        <div className="memberContainer">
                            <ImageComp className="memberImage" src={vivekImg} />
                            <div className="memberInfo">
                                <div className="title">Chair Person</div>
                                <div className="words">
                                    A talented person surely capable of building an army for world peace.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
