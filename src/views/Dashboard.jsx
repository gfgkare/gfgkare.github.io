import { useEffect } from "react";
import { MdOutlineSpaceDashboard, MdOutlineOndemandVideo } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "../styles/Dahsboard.scss";

import { useAuth } from "../contexts/AuthContext"
import gfgLogo from "../assets/GFG_KARE.svg"
import Fade from "../components/Fade";
import { Link } from "react-router-dom";



export default function Dashboard() {

    const { currentUser, USER_PRESENT } = useAuth();

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
                                        <div className="name">Hi Sabari,</div>
                                        <div className="message">Welcome back</div>
                                    </div>

                                    <div className="visuals">
                                        <div className="scoreCircleDiv">
                                            <div className="scoreCard">

                                                <div className="topText">Accuracy</div>
                                                <div className="percentage">
                                                    <CircularProgressbar value={90} text={`${98}%`} strokeWidth={12} />;
                                                </div>
                                                <div className="bottomText">
                                                    BOTTOM TEXT
                                                </div>

                                            </div>
                                        </div>

                                        <div className="marksDiv">
                                            <span className="totalMarks">Total Marks: 73</span>
                                            <span className="correctAnswers">Correctly Answered: 34</span>
                                            <span className="wrongAnswers">Incorrectly Answered: 16</span>
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
                        <button>Sign In</button>
                    )
                }
            </div>
        </Fade>
       
    )
}