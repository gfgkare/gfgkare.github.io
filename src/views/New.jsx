import "../styles/New.scss";

import CountUp from "react-countup";

export default function New() {


    return (

        <>
        
            <div className="new">


                <div className="introDiv">
                    <div className="leftText">
                        <div className="head">
                            Join the Student Club that is revolutionizing KARE
                        </div>
                        <div className="sub">
                            Get a chance to work with the team of 11 amazing individuals who are rocking the campus.
                        </div>

                        <div className="cta">
                            Join the club
                        </div>
                    </div>
                </div>

                <div className="numbersDiv">
                    <div className="shape"></div>
                    <div className="text">
                        We are a team of aspiring students from Kalasalingam University focused on making education and problem solving accessible to students.
                    </div>

                    <div className="line"></div>

                    <div className="numbers">
                            <div className="counter">
                                <span className="count">
                                    {true ? (
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
                                    {true ? (
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
                                    {true ? (
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
                </div>


            </div>
        
        </>
    )
}