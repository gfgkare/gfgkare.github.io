import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import { MdOutlineSpaceDashboard, MdOutlineOndemandVideo, MdOutlineStars } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { VscLinkExternal } from "react-icons/vsc";

import CountUp from "react-countup"
import ConfettiExplosion from 'react-confetti-explosion';

import { CircularProgressbarWithChildren , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Table from "../components/Table";
import axios from "axios";


import "../styles/Dahsboard.scss";

import { useAuth } from "../contexts/AuthContext"
import gfgLogo from "../assets/GFG_KARE.svg"
import Fade from "../components/Fade";


export default function Dashboard() {

    const { currentUser, USER_PRESENT, USER_LOADING, signinwithpopup } = useAuth();

    const [circlePerc, setCirclePerc] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [pageToShow, setPageToShow] = useState("loading");

    const visualsRef = useRef(null);
    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "TV Show",
            // First group columns
            columns: [
              {
                Header: "Name",
                accessor: "show.name",
              },
              {
                Header: "Type",
                accessor: "show.type",
              },
            ],
          },
          {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
              {
                Header: "Language",
                accessor: "show.language",
              },
              {
                Header: "Genre(s)",
                accessor: "show.genres",
              },
              {
                Header: "Runtime",
                accessor: "show.runtime",
              },
              {
                Header: "Status",
                accessor: "show.status",
              },
            ],
          },
        ],
        []
      );

      const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        (async () => {
        const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
        setData(result.data);
        })();
    }, []);


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
        if (USER_PRESENT()) setPageToShow("open");
        else if (USER_LOADING()) setPageToShow("loading");
        else if (!USER_PRESENT()) setPageToShow("login");

    }, [currentUser])

    useEffect(() => {
        if (pageToShow === "open") {
            setTimeout(() => {
                setIsVisible(true);
                setCirclePerc(95);
            }, 1000);
        }
    }, [pageToShow])

    return (
            <div className="dashboard">
                {
                    (pageToShow === "open") ? (
                        <Fade>
                            {isExploding ? <ConfettiExplosion zIndex={99} duration={4000} particleCount={50} width={3000} force={0.75} onComplete={() => setIsExploding(false)} /> : <></>}
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
                                            Rule Book <VscLinkExternal />
                                        </div>
                                    </div>
                                    <div className="tab">
                                            <MdOutlineOndemandVideo className="icon" size="15px" />
                                            <span className="name">Expert Lecture <VscLinkExternal /></span> 
                                    </div>
                                </div>
                                
                                <div className="profileImage">
                                    <img src={currentUser.photoURL} />
                                </div>
                            </div>
                            
                            <div className="rightDivContainer">
                                <div className="rightDiv">

                                    <div className="topNav">
                                        <Link to={"https://gfgkare.github.io/Algorithmist2024Rounds/"} target="_blank">List of Rounds</Link>
                                        <Link to={"https://gfgkare.github.io/Algorithmist24"} target="_blank">List of Algorithms</Link>
                                    </div>

                                    <div className="greeting">
                                        <div className="name">Hi {getFirstName(currentUser.displayName)},</div>
                                        <div className="message">Welcome back</div>
                                        <div className="info">Your Round 1 Scores are here!</div>
                                    </div>

                                    <div className="visuals" ref={visualsRef}>
                                        <div className="scoreCircleDiv">
                                            <div className="scoreCard">

                                                <div className="topText">Accuracy</div>
                                                <div className="percentage">
                                                    <CircularProgressbarWithChildren className="compProgress" 
                                                        value={circlePerc} 
                                                        strokeWidth={6}
                                                        styles={buildStyles({
                                                            pathTransitionDuration: 3,
                                                        })}        
                                                    >
                                                        {
                                                            (isVisible) ? (
                                                                <><CountUp className="circularProgressText" start={0} end={circlePerc} duration={5} onEnd={celebrate} />%</>
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                    </CircularProgressbarWithChildren>
                                                </div>
                                                <div className="bottomText">
                                                    Well Done!
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

                                        <div className="bestPerformers">
                                            <div className="topBar">
                                                Best Performers
                                                <button onClick={() => setCirclePerc(0)}>More</button>
                                            </div>

                                            <div className="rows">

                                               {
                                                    [1,2,3,4,5].map((row) => {
                                                        return (
                                                        <div className="rowContainer">
                                                            <div className="row">
                                                                <MdOutlineStars size={"40px"} />
                                                                <div className="name">
                                                                    <div className="left">
                                                                        <Link className="displayName" to={""}>Sabari S</Link>
                                                                        <div className="dept">II / IT</div>
                                                                    </div>
                                                                    <div className="right">
                                                                        <div className="accuracy">98%</div>
                                                                        <div className="scored">48/50</div>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="leaderboard">
                                        {/* <div className="row">1. Sabari S    99</div> */}
                                        <Table columns={columns} data={data} />
                                    </div>

                                </div>
                            </div>                            
                        </Fade>
                    ) : (
                        // (USER_LOADING()) ? (
                        (pageToShow === "loading") ? (
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