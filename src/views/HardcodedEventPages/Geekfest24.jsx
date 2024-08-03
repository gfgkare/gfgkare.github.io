import "../../styles/Round5Register.scss";

import gfgKare from "../../assets/GFG_KARE.svg";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function GeekFest24() {

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

                    <div className="titleAndAbout">
                        <div className="bigText">
                            <span className="title">
                                GeekFest '24
                            </span>
                            <span className="about">
                                Are you ready for an exciting online coding contest giving you a chance to win awesome swags from GeeksForGeeks? 🌟
                                Register now and prepare to showcase your coding skills!
                                All participants will receive certificates, and top performers win awesome swags from GeeksForGeeks.

                            </span>

                            <span className="time">
                                Aug 12 2024, 4 - 7 PM
                            </span>

                            <button className="register" onClick={ () => window.location.href = "https://www.geeksforgeeks.org/contest/geek-fest-2k24" }>
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
                    </div>

                    <div className="contact">
                        <div className="title">For any queries, feel free to contact</div>
                        <div className="numbers">
                            <span>Sabari S - <a href="tel:+91 87546 05197">87546 05197</a> </span>
                            <span>Navadeep Marella - <a href="tel:+91 70750 72880">70750 72880</a> </span>
                            <span>Venkateswara Rao - <a href="tel:+91 93981 07277">93981 07277</a> </span>
                            <span>Siri Chowdary - <a href="tel:+91 94911 46276">94911 46276</a> </span>
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