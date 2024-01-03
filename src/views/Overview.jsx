
import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CountUp from "react-countup"
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import Fade from '../components/Fade';

import algo24Top from "../data/algo24Top";

import { toReadableTime, getFirstName, extractName, toCapitalCase  } from "../scripts/Misc";

import { GoStarFill } from "react-icons/go";
import { GiExpand } from "react-icons/gi";


export default function Overview() {

    const navigate = useNavigate();

    // const [
    //     currentUser, circlePerc, isVisible, visualsRef, celebrate, animationDone, setAnimationDone, resultData, totalMarks, totalScoredMarks, 
    //     correctlyAnswered, incorrectlyAnswered,positiveMarks, negativeMarks, qualified, error] = useOutletContext();

    const { currentUser, 
        isVisible, visualsRef, celebrate, animationDone, setAnimationDone,
        resultData, setShowQualifiedPopup, setShowTimeBookPopup, setSelectedSlot,  
        booked,
        error } = useOutletContext();
   

    useEffect(() => {
        console.log("Overview init.");
    })
    

    return (
        <Fade>
            {
                (!error) ? (
                    <>
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
                                            value={resultData.percentage}
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
                                                        end={resultData.percentage}
                                                        duration={5}
                                                        onEnd={celebrate}
                                                    />
                                                    %
                                                </>
                                            ) : (
                                                <>{resultData.percentage}%</>
                                            )}
                                        </CircularProgressbarWithChildren>
                                    </div>
                                    <div className="bottomText">
                                        {  (resultData.percentage > 50) ? <>Excellent Work!</> : (resultData.percentage > 40) ? <>Great Job!</> : (resultData.percentage > 20) ? <>Well done!</> : <>Great!</>   }
                                    </div>
                                </div>
                            </div>

                            <div className="marksDiv">
                                <span className="marksTab totalMarks">
                                    <div className="marks">
                                        <span className="title">Total Marks</span>
                                        <span className="number">
                                            {resultData.totalScoredMarks}/{resultData.totalMarks}
                                        </span>
                                    </div>
                                    {/* <div className="icon"></div> */}
                                </span>
                                <span className="marksTab correctAnswers">
                                    <div className="marks">
                                        <span className="title">Correctly Answered</span>
                                        <span className="number">
                                            <span className="large">{resultData.correctlyAnswered}</span>
                                            <span className="small">(+{resultData.positiveMarks})</span>
                                        </span>
                                    </div>
                                    {/* <div className="icon"></div> */}
                                </span>
                                <span className="marksTab wrongAnswers">
                                    <div className="marks">
                                        <span className="title">Incorrectly Answered</span>
                                        <span className="number">
                                            <span className="large">{resultData.incorrectlyAnswered}</span>
                                            <span className="small">({resultData.negativeMarks})</span>
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
                                            <div className="rowContainer" key={index}>
                                                <div className="row">
                                                    <span className="rank">
                                                        #{index+1}
                                                    </span>
                                                    {/* <MdOutlineStars size={"40px"} /> */}
                                                    <div className="name">
                                                        <div className="left">
                                                            <div
                                                                className="displayName"
                                                            >
                                                                {extractName(row.userData.name)}
                                                            </div>
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

                        {
                            <div className="leaderboard" >
                                <div className="container">
                                <span className={"statusMessage " + (resultData.qualified ? "qualified" : "" ) }>
                                    {
                                        (resultData.qualified) ? (
                                            <>
                                                <GoStarFill />
                                                Congratulations { getFirstName(currentUser.displayName)  }! You have qualified for Round 2 of Algorithmist'24!
                                                <span className="showPopup" onClick={() => {
                                                    celebrate();
                                                    setShowQualifiedPopup(true);
                                                }}><GiExpand /></span>
                                            </>
                                        ) : (
                                            <>You did not qualify for Round 2, but be sure to join more contests. Can't wait to see you win!</>
                                        )
                                    }
                                    </span>
                                </div>
                            </div>
                        }

                    </>
                ) : (
                    <div className="error" style={ { padding: "0 1rem", display: "flex", flexDirection: "column", gap: "1rem" } }>
                        {error}
                        <span>
                            <span style={ { maxWidth: "max-content", textDecoration: "underline", cursor: "pointer" } } onClick={() => signinwithpopup("google")}>
                                Sign In{"  "}
                            </span> 
                            with another account?
                        </span>
                    </div>
                )
            }
            
           
        </Fade>
    );
}
