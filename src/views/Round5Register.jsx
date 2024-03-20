import "../styles/Round5Register.scss";

import gfgKare from "../assets/GFG_KARE.svg";

import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Round5Register() {

    const { currentUser } = useAuth();
    const navigate = useNavigate();


    const validEmails = [
        "99210041518@klu.ac.in",
        "9921004528@klu.ac.in",
        "99220041253@klu.ac.in",
        "99210042002@klu.ac.in",
        "99220041976@klu.ac.in",
        "99220040586@klu.ac.in",
        "9921004522@klu.ac.in",
        "99220041106@klu.ac.in",
        "9921004788@klu.ac.in",
        "99220040772@klu.ac.in",
        "9921004990@klu.ac.in",
        "99210042158@klu.ac.in",
        "99210041113@klu.ac.in",
        "99220040551@klu.ac.in",
        "99210041979@klu.ac.in",
        "9921004107@klu.ac.in",
        "99210041956@klu.ac.in",
        "99210041814@klu.ac.in",
        "99220040688@klu.ac.in",
        "99210041232@klu.ac.in",
        "99210041835@klu.ac.in",
        "99220041400@klu.ac.in",
        "99210042006@klu.ac.in",
        "9921004954@klu.ac.in",
        "99210041471@klu.ac.in",
        "99210041790@klu.ac.in",
        "9921004469@klu.ac.in",
        "9921004014@klu.ac.in",
        "99210041614@klu.ac.in",
        "99210041727@klu.ac.in",
        "99210041610@klu.ac.in",
        "9921004079@klu.ac.in",
        "99220041877@klu.ac.in",
        "9921004138@klu.ac.in",
        "9922008051@klu.ac.in",
        "9921004910@klu.ac.in",
        "99220040809@klu.ac.in",
        "99210041006@klu.ac.in",
        "9921004846@klu.ac.in",
        "99210042147@klu.ac.in",
        "99220041036@klu.ac.in",
        "99210041136@klu.ac.in",
        "99220041631@klu.ac.in",
        "99220041389@klu.ac.in",
        "99220041489@klu.ac.in",
        "99210042287@klu.ac.in",
        "99210041621@klu.ac.in",
        "99220040516@klu.ac.in",
        "99220042058@klu.ac.in",
        "99220041623@klu.ac.in",
        "99210042156@klu.ac.in",
        "99210041308@klu.ac.in",
        "99210041015@klu.ac.in",
        "9921004582@klu.ac.in",
        "99210042267@klu.ac.in",
        "9921004802@klu.ac.in",
        "99220040182@klu.ac.in",
        "99210041872@klu.ac.in",
        "99220041894@klu.ac.in",
        "99210042206@klu.ac.in",
        "98220040005@klu.ac.in",
        "9921004953@klu.ac.in",
        "9921004189@klu.ac.in",
        "99210041910@klu.ac.in",
        "9921004849@klu.ac.in",
        "9922008342@klu.ac.in",
        "gvsskvineeth@gmail.com",
        "balajinbtt@gmail.com",
        "adiniparimal229@gmail.com"
    ]

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
                            Algorithmist '24 - Grand Finale
                        </span>
                        <span className="about" onClick={ () => alert(currentUser.email) }>
                        Prepare for the ultimate challenge! Round 5 calls out to those who dare to push their limits. 
                        After conquering four rounds of intense coding battles, you've proven your resilience.
                        Ready to showcase your mastery in the final round? Register now!
                        </span>
                        {
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
                        
                    </div>



                    <div className="timeline">
                        <span className="title">
                            Timeline
                        </span>

                        <div className="box">
                            <span className="stepTitle">
                                Grand Finale
                            </span>
                            <span className="stepAbout">
                                5 coding questions based on algorithms.
                            </span>
                            <span className="dateTime">
                                22 March 2024, 10AM - 1PM
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                Validation Ceremony
                            </span>
                            <span className="stepAbout">
                                To acknowledge the efforts of our participants during the Grand Finale.
                            </span>
                            <span className="dateTime">
                                22 March 2024, 2PM - 3:30PM
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="box">
                            <span className="stepTitle">
                                QA Program with Chief Guest
                            </span>
                            <span className="stepAbout">
                                Engaging QA session with our Chief Guest.
                            </span>
                            <span className="dateTime">
                                22 March 2024, 4PM - 5:30PM
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
            


        </>
    )
}