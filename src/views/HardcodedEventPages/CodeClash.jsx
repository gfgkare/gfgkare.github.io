import "../../styles/Round5Register.scss";

import gfgKare from "../../assets/GFG_KARE.svg";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CodeClash() {

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
                            <span className="name">CODECRAFT</span>
                            <span className="year">2024</span>
                        </span>
                        <span className="subTitle">
                            A System Design Competetion
                        </span>
                        <span className="about">
                        Join us for a high-impact event to challenge your system design skills! Every company asks for system design in interviews—now’s your chance to master real-world architectures and excel in your career.
                        </span>

                        <span className="time">
                            Oct 18 2024
                        </span>

                        <button className="register" onClick={ () => toast.info("Will be opened soon.") }>
                            Registrations will be opened soon.
                        </button>
                    </div>



                    <div className="timeline">
                        <span className="title">
                            How to Design a System
                        </span>

                        <div className="box">
                            <span className="stepTitle">
                                Gather Requirements
                            </span>
                            <span className="stepAbout">
                            Clarify functional and non-functional requirements, focusing on scalability, performance, availability, and use cases to guide your design decisions.
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                High-Level Design
                            </span>
                            <span className="stepAbout">
                                Create an architectural overview, identifying key components, database models, API design, and communication flows. Prioritize modularity and fault tolerance.
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Finalize Design
                            </span>
                            <span className="stepAbout">
                                Solidify component interactions, ensure fault tolerance, and validate the design for scalability, security, and performance to meet all requirements.
                            </span>
                        </div>
                    </div>

                    <div className="prizes">
                        <div className="title">
                            Prizes
                        </div>
                        
                        <div className="prizesGrid">
                            <div className="prizeCard first">
                                <div className="circle"></div>
                                <div className="position">WINNER</div>
                                <div className="prize">₹ 4,000</div>
                                <div className="and">+ certificate and GFG swags!</div>
                            </div>
                            <div className="prizeCard second">
                                <div className="circle"></div>
                                <div className="position">1ST RUNNER UP</div>
                                <div className="prize">₹ 2,000</div>
                                <div className="and">+ certificate and GFG swags!</div>
                            </div>
                            <div className="prizeCard third">
                                <div className="circle"></div>
                                <div className="position">2ND RUNNER UP</div>
                                <div className="prize">₹ 1,000</div>
                                <div className="and">+ certificate and GFG swags!</div>
                            </div>
                            <div className="prizeCard participation">
                                <div className="circle"></div>
                                <div className="position">PARTICIPANTS</div>
                                <div className="prize"></div>
                                <div className="and">Certificate</div>
                            </div>
                        </div>
                    </div>

                    <div className="contact">
                        <div className="title">For any queries, feel free to contact</div>
                        <div className="numbers">
                            <span>Adini Parimal - <a href="tel:+91 83417 52279">83417 52279</a> </span>
                            <span>Sabari - <a href="tel:+91 87546 05197">87546 05197</a> </span>
                            <span>Navadeep Marella - <a href="tel:+91 70750 72880">70750 72880</a> </span>
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