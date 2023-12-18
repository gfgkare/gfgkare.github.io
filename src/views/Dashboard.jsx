import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineOndemandVideo } from "react-icons/md";
import { GoBook } from "react-icons/go";
import CountUp from "react-countup"
import ConfettiExplosion from 'react-confetti-explosion';

import { CircularProgressbar, CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "../styles/Dahsboard.scss";

import { useAuth } from "../contexts/AuthContext"
import gfgLogo from "../assets/GFG_KARE.svg"
import Fade from "../components/Fade";
import GradientProgress from "../components/GradientProgress";


export default function Dashboard() {

    const { currentUser, USER_PRESENT, USER_LOADING, signinwithpopup } = useAuth();

    const [circlePerc, setCirclePerc] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    const observedElementRef = useRef(null);

    const celebrate = () => {
        setIsExploding(true);
    }


    const getFirstName = (fullDisplayName) => {
        return toTitleCase(fullDisplayName.split(" ")[0]);
    }

    const toTitleCase = (name) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase()
    }
    
    useEffect(() => {
        
        const options = {
            threshold: 0.3,
          };
      
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                alert("Visible")
                setCirclePerc(87)
                
                observer.unobserve();
              } else {
                setIsVisible(false);
              }
            });
          }, options);
      
          if (observedElementRef.current) {
            observer.observe(observedElementRef.current);
          }
      
          
          // Cleanups.
          return () => {
            if (observedElementRef.current) observer.disconnect();
          }
        
    }, [])

    return (
            <div className="dashboard">
                {
                    (USER_PRESENT()) ? (
                        <Fade>
                            {isExploding ? <ConfettiExplosion zIndex={99} particleCount={50} width={3000} force={0.75} onComplete={() => setIsExploding(false)} /> : <></>}
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
                                        <div className="info">Your Round 1 Scores are here!</div>
                                    </div>

                                    <div className="visuals" ref={observedElementRef}>
                                        <div className="scoreCircleDiv">
                                            <div className="scoreCard">

                                                <div className="topText">Accuracy</div>
                                                <div className="percentage">

                                                    {/* <div className="container">
                                                        <div className="box">
                                                            <div className="circle" style={ {"--i": `${circlePerc}%` } }>
                                                                <h2>{circlePerc}%</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     */}
                                                <CircularProgressbarWithChildren className="compProgress" 
                                                    value={circlePerc} 
                                                    strokeWidth={6}
                                                    styles={buildStyles({
                                                        pathTransitionDuration: 3,
                                                    })}        
                                                >
                                                     <CountUp className="circularProgressText" start={0} end={circlePerc} duration={5} onEnd={celebrate} />%
                                                </CircularProgressbarWithChildren>
                                                    
                                                    {/* <CircularProgressbar className="compProgress" value={circlePerc} text={`${circlePerc}%`} strokeWidth={6} /> */}
                                                    {/* <GradientProgress percentage={96} startColor="#3be73b" endColor="#7af47a" gradientId="progress"> 
                                                        <h5>96%</h5>
                                                    </GradientProgress> */ }
                                                </div>
                                                <div className="bottomText">
                                                    BOTTOM TEXT
                                                </div>

                                            </div>
                                        </div>

                                        <div className="marksDiv">
                                            <span className="marksTab totalMarks">
                                                <div className="marks">
                                                    <span className="title">Total Marks</span>
                                                    <span className="number">46/50</span>
                                                </div>
                                                <div className="icon">
                                                </div>
                                            </span>
                                            <span className="marksTab correctAnswers">
                                                <div className="marks">
                                                    <span className="title">Correctly Answered</span>
                                                    <span className="number">
                                                        <span className="large">33</span>
                                                        <span className="small">(+44)</span>
                                                    </span>
                                                </div>
                                                <div className="icon">
                                                </div>
                                            </span>
                                            <span className="marksTab wrongAnswers">
                                                <div className="marks">
                                                    <span className="title">Incorrectly Answered</span>
                                                    <span className="number">
                                                        <span className="large">17</span>
                                                        <span className="small">(-24)</span>
                                                    </span>
                                                </div>
                                                <div className="icon">
                                                </div>
                                            </span>
                                        </div>

                                        <div className="sectionTBD">
                                            <div>
                                                Best Performers
                                                <button onClick={() => setCirclePerc(90)}>MORE</button>
                                                <button onClick={() => setCirclePerc(0)}>LESS</button>
                                            </div>

                                            <div className="rows">
                                                <div>
                                                    <img src="" alt="" />
                                                    <div className="name">
                                                        <div className="left">
                                                            <div>Sabari S</div>
                                                            <div>II / IT</div>
                                                        </div>
                                                        <div className="right">
                                                            <div>98%</div>
                                                            <div>48/50</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="leaderboard">
                                        <div className="row">1. Sabari S    99</div>
                                    </div>

                                </div>
                            </div>                            
                        </Fade>
                    ) : (
                        (USER_LOADING()) ? (
                            "loading..."
                        ) : (
                            <div className="notSignedIn">
                                Log in to use the dashboard.
                                <button onClick={() => signinwithpopup("google")}>Sign In</button>
                            </div>
                        )
                        
                    )
                }
            </div>
       
    )
}