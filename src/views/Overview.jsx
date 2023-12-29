
import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CountUp from "react-countup"
import { MdOutlineStars } from "react-icons/md";
import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import Fade from '../components/Fade';
import Table from "../components/Table";
import CustomTable from "../components/CustomTable";


export default function Overview() {

    const leaderBoard = useRef();

    const [
        currentUser, circlePerc, isVisible, visualsRef, celebrate, animationDone, setAnimationDone, totalMarks, totalScoredMarks, 
        correctlyAnswered, incorrectlyAnswered,positiveMarks, negativeMarks, error] = useOutletContext();

    
    const tableRows = [
        [ 1, "Grace", 48, "27%" ],
        [ 2, "Eva", 24, "67%" ],
        [ 3, "Eva", 67, "7%" ],
        [ 4, "David", 58, "6%" ],
        [ 5, "Arish", 42, "96%" ],
        [ 6, "David", 53, "80%" ],
        [ 7, "Charlie", 67, "55%" ],
        [ 8, "Charlie", 32, "6%" ],
        [ 9, "Arish", 66, "98%" ],
        [ 10, "Jesse", 61, "33%" ],
        [ 11, "Charlie", 26, "99%" ],
        [ 12, "David", 28, "35%" ],
        [ 13, "Arish", 47, "54%" ],
        [ 14, "Grace", 36, "21%" ],
        [ 15, "Grace", 49, "7%" ],
        [ 16, "Bob", 26, "65%" ],
        [ 17, "Grace", 56, "1%" ],
        [ 18, "Alice", 59, "71%" ],
        [ 19, "Jesse", 30, "64%" ],
        [ 20, "David", 50, "16%" ],
        [ 21, "Eva", 62, "92%" ],
        [ 22, "Grace", 34, "35%" ],
        [ 23, "Eva", 62, "91%" ],
        [ 24, "Frank", 34, "78%" ],
        [ 25, "David", 65, "58%" ],
        [ 26, "Eva", 22, "95%" ],
        [ 27, "Alice", 28, "69%" ],
        [ 28, "Bob", 47, "95%" ],
        [ 29, "Eva", 28, "54%" ],
        [ 30, "David", 37, "34%" ],
        [ 31, "Arish", 36, "13%" ],
        [ 32, "Frank", 50, "9%" ],
        [ 33, "David", 20, "12%" ],
        [ 34, "Arish", 55, "77%" ],
        [ 35, "Grace", 26, "41%" ],
        [ 36, "David", 43, "16%" ],
        [ 37, "Arish", 20, "59%" ],
        [ 38, "David", 21, "1%" ],
        [ 39, "Jesse", 44, "32%" ],
        [ 40, "Sabari", 22, "42%" ],
        [ 41, "Arish", 46, "19%" ],
        [ 42, "Arish", 35, "61%" ],
        [ 43, "Frank", 39, "44%" ],
        [ 44, "Jesse", 54, "78%" ],
        [ 45, "David", 24, "16%" ],
        [ 46, "Bob", 57, "50%" ],
        [ 47, "Arish", 25, "11%" ],
        [ 48, "Grace", 63, "43%" ],
        [ 49, "Jesse", 59, "54%" ],
        [ 50, "Jesse", 26, "95%" ],
        [ 51, "Alice", 53, "39%" ],
        [ 52, "Bob", 61, "85%" ],
        [ 53, "Charlie", 58, "38%" ],
        [ 54, "Charlie", 37, "21%" ],
        [ 55, "Jesse", 26, "78%" ],
        [ 56, "Alice", 62, "30%" ]
    ]
   
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
                            <span className="number">{totalScoredMarks}/{totalMarks}</span>
                        </div>
                        <div className="icon"></div>
                    </span>
                    <span className="marksTab correctAnswers">
                        <div className="marks">
                            <span className="title">Correctly Answered</span>
                            <span className="number">
                                <span className="large">{correctlyAnswered}</span>
                                <span className="small">(+{positiveMarks})</span>
                            </span>
                        </div>
                        <div className="icon"></div>
                    </span>
                    <span className="marksTab wrongAnswers">
                        <div className="marks">
                            <span className="title">Incorrectly Answered</span>
                            <span className="number">
                                <span className="large">{incorrectlyAnswered}</span>
                                <span className="small">({negativeMarks})</span>
                            </span>
                        </div>
                        <div className="icon"></div>
                    </span>
                </div>

                <div className="bestPerformers">
                    <div className="topBar">
                        Best Performers
                        {/* <button onClick={() => leaderBoard.current.scrollIntoView()}>More</button> */}
                        <button>More</button>
                    </div>

                    <div className="rows">
                        {[1].map((row) => {
                            return (
                                <div className="rowContainer">
                                    <div className="row">
                                        <MdOutlineStars size={"40px"} />
                                        <div className="name">
                                            <div className="left">
                                                <Link
                                                    className="displayName"
                                                >
                                                    Will be updated soon!
                                                </Link>
                                                <div className="dept">
                                                    
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="accuracy">
                                                    ?%
                                                </div>
                                                <div className="scored">
                                                    ?/90
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

            <div className="leaderboard" ref={leaderBoard}>
                {/* <CustomTable headers={["Rank", "Name", "Marks", "Percentage"]} rows={tableRows} /> */}
            </div>
        </Fade>
    );
}
