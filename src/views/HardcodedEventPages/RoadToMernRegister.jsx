import "../../styles/Round5Register.scss";

import gfgKare from "../../assets/GFG_KARE.svg";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function RoadToMernRegister() {

    const { currentUser } = useAuth();
    const navigate = useNavigate();


    return (
        <>
        <div className="base">

            <div className="wrapper">
                <nav className="topNav" onClick={() => console.log(currentUser)}>
                    <div className="logo">
                        <img src={gfgKare} />
                    </div>
                    <div className="user">
                        {(currentUser && currentUser !== "none") ? <img onClick={ () => navigate("/profile", { state: { from: location.pathname } }) } src={currentUser.photoURL} /> : <button onClick={ () => navigate( "/profile", { state: { from: location.pathname } } ) }>Login</button> }
                    </div>
                </nav>

                <div className="round5">

                    <div className="bigText">
                        <span className="title">
                            Roadmap to MERN Stack
                        </span>
                        <span className="about">
                            Ready to boost your coding journey with a MERN Stack workshop? This program is ideal for both beginners who are
                            starting out and for seasoned developers. This program equips you with skills so you could get started in MERN Stack.
                        </span>

                        <span className="time">
                            Jul 29 2024, 5:30 - 6:30 PM
                        </span>

                        <button className="register" onClick={ () => window.location.href = "https://www.geeksforgeeks.org/event/roadmap-to-mern-stack-kalasalingam-academy-of-research-and-education-gfg" }>
                            Register Now
                        </button>
                    </div>



                    <div className="timeline">
                        <span className="title">
                            What you will learn
                        </span>

                        <div className="box">
                            <span className="stepTitle">
                                Foundation
                            </span>
                            <span className="stepAbout">
                                MongoDB, Express.js, React.js, Node.js
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Strategies
                            </span>
                            <span className="stepAbout">
                                Time Management and Problem Solving approaches.
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Resources
                            </span>
                            <span className="stepAbout">
                                Recommendations for books, online courses and problems to practice.
                            </span>
                        </div>
                    </div>

                    <div className="contact">
                        <div className="title">For any queries, feel free to contact</div>
                        <div className="numbers">
                            <span>Sabari - <a href="tel:+91 87546 05197">87546 05197</a> </span>
                            <span>Navadeep Marella - <a href="tel:+91 70750 72880">70750 72880</a> </span>
                            <span>Venkateswara Rao - <a href="tel:+91 93981 07277">93981 07277</a> </span>
                            <span>Siri Srinivas - <a href="tel:+91 94911 46276">94911 46276</a> </span>
                        </div>
                    </div>

                    <footer>
                        💚 GFG KARE
                    </footer>
                </div>
            </div>
        </div>
            


        </>
    )
}