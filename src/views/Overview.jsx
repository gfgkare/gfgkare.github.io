
import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CountUp from "react-countup"
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import Fade from '../components/Fade';


import algo24Top from "../data/algo24Top";

export default function Overview() {

    const navigate = useNavigate();

    const [
        currentUser, circlePerc, isVisible, visualsRef, celebrate, animationDone, setAnimationDone, totalMarks, totalScoredMarks, 
        correctlyAnswered, incorrectlyAnswered,positiveMarks, negativeMarks, error] = useOutletContext();

    
    function toReadableTime(timestamp) {
        timestamp = parseFloat(timestamp)
        let minutes = Math.floor(timestamp);
        const seconds = Math.round((timestamp - minutes) * 60);
      
        let hours = 0;
        if (minutes >= 60) {
          hours = Math.floor(minutes / 60);
          minutes %= 60;
        }
      
        const timeParts = [];
        if (hours > 0) {
          timeParts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
        }
        if (minutes > 0) {
          timeParts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
        }
        if (seconds > 0) {
          timeParts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
        }
      
        if (timeParts.length > 1) {
          const lastIndex = timeParts.length - 1;
          timeParts.splice(lastIndex, 0, 'and');
        }
      
        return timeParts.join(' ');
      }
   
    const getFirstName = (fullDisplayName) => {
        if (fullDisplayName) return toTitleCase(fullDisplayName?.split(" ")[0]);
    }

    const extractName = (inputName) => {
        const match = inputName.match(/^[^\d]+/);
      
        if (match) {
          const formattedName = match[0].toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
          return formattedName;
        }
      
        return inputName;
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
                        <div className="bottomText">
                            {  (circlePerc > 50) ? <>Excellent Work!</> : (circlePerc > 40) ? <>Great Job!</> : (circlePerc > 20) ? <>Well done!</> : <>Great!</>   }
                        </div>
                    </div>
                </div>

                <div className="marksDiv">
                    <span className="marksTab totalMarks">
                        <div className="marks">
                            <span className="title">Total Marks</span>
                            <span className="number">
                                {totalScoredMarks}/{totalMarks}
                            </span>
                        </div>
                        {/* <div className="icon"></div> */}
                    </span>
                    <span className="marksTab correctAnswers">
                        <div className="marks">
                            <span className="title">Correctly Answered</span>
                            <span className="number">
                                <span className="large">{correctlyAnswered}</span>
                                <span className="small">(+{positiveMarks})</span>
                            </span>
                        </div>
                        {/* <div className="icon"></div> */}
                    </span>
                    <span className="marksTab wrongAnswers">
                        <div className="marks">
                            <span className="title">Incorrectly Answered</span>
                            <span className="number">
                                <span className="large">{incorrectlyAnswered}</span>
                                <span className="small">({negativeMarks})</span>
                            </span>
                        </div>
                        {/* <div className="icon"></div> */}
                    </span>
                </div>

                <div className="bestPerformers">
                    <div className="topBar">
                        Best Performers
                        <button onClick={() => navigate("/dashboard/results")}>More</button>
                    </div>

                    <div className="rows">
                        {algo24Top.slice(0,5).map((row, index) => {
                            return (
                                <div className="rowContainer">
                                    <div className="row">
                                        <span className="rank">
                                            #{index+1}
                                        </span>
                                        {/* <MdOutlineStars size={"40px"} /> */}
                                        <div className="name">
                                            <div className="left">
                                                <Link
                                                    className="displayName"
                                                >
                                                    {extractName(row.userData.name)}
                                                </Link>
                                                <div className="dept">
                                                    Completed in {toReadableTime(row.userData.completionTime)}
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="accuracy">
                                                    { parseInt((row.userData.overallMarks / 90) * 100) }%
                                                </div>
                                                <div className="scored">
                                                    {row.userData.overallMarks}/90
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

            {/* <div className="leaderboard" ref={leaderBoard}>
            </div> */}
        </Fade>
    );
}
