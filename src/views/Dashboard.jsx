import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineOndemandVideo } from "react-icons/md";
import { GoBook } from "react-icons/go";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "../styles/Dahsboard.scss";

import { useAuth } from "../contexts/AuthContext"
import gfgLogo from "../assets/GFG_KARE.svg"
import Fade from "../components/Fade";
import GradientProgress from "../components/GradientProgress";


export default function Dashboard() {

    const { currentUser, USER_PRESENT, signinwithpopup } = useAuth();

    const circlePerc = 88;

    const getFirstName = (fullDisplayName) => {
        return toTitleCase(fullDisplayName.split(" ")[0]);
    }

    const toTitleCase = (name) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase()
    }
    

    return (
        <Fade>
            <div className="dashboard">
                {
                    (USER_PRESENT()) ? (
                        <>
                            <div className="leftNav open">
                                <div className="logo">
                                    <img src={gfgLogo} alt="logo" />
                                </div>

                                <div className="icons">
                                    <div className="tab">
                                            <MdOutlineSpaceDashboard className="icon" size="15px" />
                                            <span className="name">Overview</span>
                                    </div>
                                    <div className="tab">
                                        <div className="number one icon">
                                            <span>1</span>
                                        </div>
                                        <span className="name">Round 1</span>
                                    </div>
                                    <div className="tab">
                                        <div className="icon">
                                            <GoBook size="25px" />
                                        </div>
                                        <div className="name">
                                            Rule Book
                                        </div>
                                    </div>
                                    <div className="tab">
                                            <MdOutlineOndemandVideo className="icon" size="15px" />
                                            <span className="name">Expert Lecture</span>
                                    </div>
                                </div>
                                
                                <div className="profileImage">
                                    <img src={currentUser.photoURL} />
                                </div>
                            </div>
                            
                            <div className="rightDivContainer">
                                <div className="rightDiv">

                                    <div className="topNav">
                                        <Link>List of Rounds</Link>
                                        <Link>List of Algorithms</Link>
                                    </div>

                                    <div className="greeting">
                                        <div className="name">Hi {getFirstName(currentUser.displayName)},</div>
                                        <div className="message">Welcome back</div>
                                    </div>

                                    <div className="visuals">
                                        <div className="scoreCircleDiv">
                                            <div className="scoreCard">

                                                <div className="topText">Accuracy</div>
                                                <div className="percentage">

                                                    <div className="container">
                                                        <div className="box">
                                                            <div className="circle" style={ {"--i": `${circlePerc}%` } }>
                                                                <h2>{circlePerc}%</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    {/* <CircularProgressbar value={90} text={`${98}%`} strokeWidth={9} /> */}
                                                    {/* <GradientProgress percentage={96} startColor="#3be73b" endColor="#7af47a" gradientId="progress"> 
                                                        <h5>96%</h5>
                                                    </GradientProgress> */}
                                                </div>
                                                <div className="bottomText">
                                                    BOTTOM TEXT
                                                </div>

                                            </div>
                                        </div>

                                        <div className="marksDiv">
                                            <span className="marksTab totalMarks">
                                                <span className="title">Total Marks</span>
                                                <span className="number">46/50</span>
                                            </span>
                                            <span className="marksTab correctAnswers">
                                                <span className="title">Correct Answers</span>
                                                <span className="number">
                                                    <div className="large">23</div>
                                                    <div className="small">(+48)</div>
                                                </span>
                                            </span>
                                            <span className="marksTab wrongAnswers">
                                            <span className="title">Wrong Answers</span>
                                                <span className="number">
                                                    <div className="large">7</div>
                                                    <div className="small">(-12)</div>
                                                </span>
                                            </span>
                                        </div>

                                        <div className="sectionTBD">
                                            something
                                        </div>
                                    </div>

                                    <div className="leaderboard">
                                        <div className="row">1. Sabari S    99</div>
                                    </div>

                                </div>
                            </div>                            
                        </>
                    ) : (
                        <div className="notSignedIn">
                            Log in to use the dashboard.
                            <button onClick={() => signinwithpopup("google")}>Sign In</button>
                        </div>
                    )
                }
            </div>
        </Fade>
       
    )
}