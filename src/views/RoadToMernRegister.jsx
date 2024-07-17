import "../styles/Round5Register.scss";

import gfgKare from "../assets/GFG_KARE.svg";

import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function RoadToMernRegister() {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // const validEmails = [
    //     "99210041518@klu.ac.in",
    //     "9921004528@klu.ac.in",
    //     "99220041253@klu.ac.in",
    //     "99210042002@klu.ac.in",
    //     "99220041976@klu.ac.in",
    //     "99220040586@klu.ac.in",
    //     "9921004522@klu.ac.in",
    //     "99220041106@klu.ac.in",
    //     "9921004788@klu.ac.in",
    //     "99220040772@klu.ac.in",
    //     "9921004990@klu.ac.in",
    //     "99210042158@klu.ac.in",
    //     "99210041113@klu.ac.in",
    //     "99220040551@klu.ac.in",
    //     "99210041979@klu.ac.in",
    //     "9921004107@klu.ac.in",
    //     "99210041956@klu.ac.in",
    //     "99210041814@klu.ac.in",
    //     "99220040688@klu.ac.in",
    //     "99210041232@klu.ac.in",
    //     "99210041835@klu.ac.in",
    //     "99220041400@klu.ac.in",
    //     "99210042006@klu.ac.in",
    //     "9921004954@klu.ac.in",
    //     "99210041471@klu.ac.in",
    //     "99210041790@klu.ac.in",
    //     "9921004469@klu.ac.in",
    //     "9921004014@klu.ac.in",
    //     "99210041614@klu.ac.in",
    //     "99210041727@klu.ac.in",
    //     "99210041610@klu.ac.in",
    //     "9921004079@klu.ac.in",
    //     "99220041877@klu.ac.in",
    //     "9921004138@klu.ac.in",
    //     "9922008051@klu.ac.in",
    //     "9921004910@klu.ac.in",
    //     "99220040809@klu.ac.in",
    //     "99210041006@klu.ac.in",
    //     "9921004846@klu.ac.in",
    //     "99210042147@klu.ac.in",
    //     "99220041036@klu.ac.in",
    //     "99210041136@klu.ac.in",
    //     "99220041631@klu.ac.in",
    //     "99220041389@klu.ac.in",
    //     "99220041489@klu.ac.in",
    //     "99210042287@klu.ac.in",
    //     "99210041621@klu.ac.in",
    //     "99220040516@klu.ac.in",
    //     "99220042058@klu.ac.in",
    //     "99220041623@klu.ac.in",
    //     "99210042156@klu.ac.in",
    //     "99210041308@klu.ac.in",
    //     "99210041015@klu.ac.in",
    //     "9921004582@klu.ac.in",
    //     "99210042267@klu.ac.in",
    //     "9921004802@klu.ac.in",
    //     "99220040182@klu.ac.in",
    //     "99210041872@klu.ac.in",
    //     "99220041894@klu.ac.in",
    //     "99210042206@klu.ac.in",
    //     "98220040005@klu.ac.in",
    //     "9921004953@klu.ac.in",
    //     "9921004189@klu.ac.in",
    //     "99210041910@klu.ac.in",
    //     "9921004849@klu.ac.in",
    //     "9922008342@klu.ac.in",
    //     "gvsskvineeth@gmail.com",
    //     "balajinbtt@gmail.com",
    //     "adiniparimal229@gmail.com"
    // ]

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
                            {/* Jul 17 2024, 5:30 - 6:30 PM */}
                        </span>

                        <button className="register" onClick={ () => window.location.href = "https://www.geeksforgeeks.org/event/roadmap-to-mern-stack-kalasalingam-academy-of-research-and-education-gfg" }>
                            Register Now
                        </button>
                        {/* {
                            ( currentUser && currentUser !== "none" ) ? (
                                ( validEmails.includes( currentUser.email ) ) ? (
                                    <button className="register" onClick={ () => window.location.href = "https://practice.geeksforgeeks.org/contest/algorithmist-24-finale" }>
                                        Register Now
                                    </button>
                                ) : (
                                    <span className="error">This email address cannot be used to register. Only qualified students' KLU mail can be used. <Link to="/profile" state={ { from: location.pathname } } >Sign in</Link> with another account? </span>
                                )
                                
                            ) : (
                                <button className="register" onClick={ () => navigate("/profile", { state: { from: location.pathname } }) }>
                                    Log in to register
                                </button>
                            )
                        }
                         */}
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
                            {/* <span className="dateTime">
                                1
                            </span> */}
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Strategies
                            </span>
                            <span className="stepAbout">
                                Time Management and Problem Solving approaches.
                            </span>
                            {/* <span className="dateTime">
                                2
                            </span> */}
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Resources
                            </span>
                            <span className="stepAbout">
                                Recommendations for books, online courses and problems to practice.
                            </span>
                            {/* <span className="dateTime">
                                3
                            </span> */}
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