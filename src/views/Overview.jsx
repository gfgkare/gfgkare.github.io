
import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Table from "../components/Table";
import CountUp from "react-countup"
import { MdOutlineStars } from "react-icons/md";
import { useOutletContext, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Fade from '../components/Fade';

export default function Overview() {
    

    const [currentUser, circlePerc, isVisible, visualsRef, celebrate, animationDone, setAnimationDone] = useOutletContext();

   
    const getFirstName = (fullDisplayName) => {
        if (fullDisplayName) return toTitleCase(fullDisplayName?.split(" ")[0]);
    }

    const toTitleCase = (name) => {
        return name[0].toUpperCase() + name?.slice(1).toLowerCase()
    }

    useEffect(() => {
        console.log("Overview init.");
    })
    

    return (
        <Fade>
            <div className="greeting">
                <div className="name">
                    Hi {getFirstName(currentUser.displayName) || "there"},
                </div>
                <div className="message">Welcome back</div>
                <div className="info">Your Round 1 Scores are here!</div>
            </div>

            <div className="visuals" ref={visualsRef}>
                <div className="scoreCircleDiv">
                    <div className="scoreCard">
                        <div className="topText">Accuracy</div>
                        <div className="percentage">
                            <CircularProgressbarWithChildren
                                className="compProgress"
                                value={circlePerc}
                                strokeWidth={6}
                                styles={buildStyles({
                                    pathTransitionDuration: 3,
                                })}
                            >
                                {(isVisible && !animationDone) ? (
                                    <>
                                        <CountUp
                                            className="circularProgressText"
                                            start={0}
                                            end={circlePerc}
                                            duration={5}
                                            onEnd={celebrate}
                                        />
                                        %
                                    </>
                                ) : (
                                    <>{circlePerc}%</>
                                )}
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className="bottomText">Well Done!</div>
                    </div>
                </div>

                <div className="marksDiv">
                    <span className="marksTab totalMarks">
                        <div className="marks">
                            <span className="title">Total Marks</span>
                            <span className="number">46/50</span>
                        </div>
                        <div className="icon"></div>
                    </span>
                    <span className="marksTab correctAnswers">
                        <div className="marks">
                            <span className="title">Correctly Answered</span>
                            <span className="number">
                                <span className="large">33</span>
                                <span className="small">(+44)</span>
                            </span>
                        </div>
                        <div className="icon"></div>
                    </span>
                    <span className="marksTab wrongAnswers">
                        <div className="marks">
                            <span className="title">Incorrectly Answered</span>
                            <span className="number">
                                <span className="large">17</span>
                                <span className="small">(-24)</span>
                            </span>
                        </div>
                        <div className="icon"></div>
                    </span>
                </div>

                <div className="bestPerformers">
                    <div className="topBar">
                        Best Performers
                        <button>More</button>
                    </div>

                    <div className="rows">
                        {[1, 2, 3, 4, 5].map((row) => {
                            return (
                                <div className="rowContainer">
                                    <div className="row">
                                        <MdOutlineStars size={"40px"} />
                                        <div className="name">
                                            <div className="left">
                                                <Link
                                                    className="displayName"
                                                    to={"/members/GK2311011101"}
                                                >
                                                    Sabari S
                                                </Link>
                                                <div className="dept">
                                                    II / IT
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="accuracy">
                                                    98%
                                                </div>
                                                <div className="scored">
                                                    48/50
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="leaderboard">
                <Table />
            </div>
        </Fade>
    );
}
