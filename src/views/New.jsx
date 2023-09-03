import "../styles/New.scss";

import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import coreTeamMembers from "../data/coreTeamInfo.js";
import { useMisc } from "../contexts/MiscContext";
import SectionDivider from "../components/SectionDivider";

export default function New() {
    const { aboutRevealed, setAboutRevealed, teamRevealed, setTeamRevealed } =
        useMisc();

    const teamSection = useRef();
    const aboutSection = useRef();

    const [aboutVisible, setAboutVisible] = useState(false);
    const [teamVisible, setTeamVisible] = useState(false);

    useEffect(() => {
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log(`%c ${entries[0].intersectionRatio}`, "color: red" );

                if (entries[0].intersectionRatio >= 0.5) {
                    console.log(`%c about above 5 ratio`, "color: red" );
                    aboutObserver.unobserve(aboutSection.current);

                    if (!aboutRevealed) {
                        setAboutVisible(true);
                        setTimeout(() => setAboutRevealed(true), 5000);
                    }
                }
               
            }
        });
        if (!aboutRevealed) {
            aboutObserver.observe(aboutSection.current);
        } else {
            setAboutVisible(true);
        }

        const teamObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log(`%c ${entries[0].intersectionRatio}`, "color: red" );

                if (entries[0].intersectionRatio > 0.5) {
                    console.log(`%c team above 5 ratio`, "color: red" );
                    teamObserver.unobserve();
                } 

                if (!teamRevealed) {
                    setTeamVisible(true);
                    setTimeout(() => setTeamRevealed(true), 1000);
                }
            }
        });
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

                            <div className="cta">Join the club</div>
                        </div>
                    </div>
                </section>

                <section ref={aboutSection}>
                    <div className="numbersDiv">
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
                                    {!aboutRevealed ? (
                                        <CountUp
                                            start={101}
                                            end={1000}
                                            duration={6}
                                        />
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
                                Talks{"   "}
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
                                Events
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider relativeWidth />

                <section className="teamSection">
                    <div className="teamTitle">
                        Our Team
                    </div>

                    <div className="teamGridContainer">
                        <div
                            className={`teamGrid ${
                                teamVisible ? "teamVisible" : ""
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
            </div>
        </>
    );
}
