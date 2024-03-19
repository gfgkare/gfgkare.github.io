import "../styles/Round5Register.scss";

import gfgKare from "../assets/GFG_KARE.svg";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Round5Register() {

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
                        {(currentUser && currentUser !== "none") ? <img src={currentUser.photoURL} /> : <button onClick={ () => navigate( "/profile", { state: { from: location.href } } ) }>Login</button> }
                    </div>
                </nav>

                <div className="round5">

                    <div className="bigText">
                        <span className="title">
                            Algorithmist '24 - Round 5
                        </span>
                        <span className="about">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis neque aut tenetur accusantium, excepturi sit, nobis dolorum corrupti consequuntur laborum distinctio, possimus similique quo. Optio quia officia voluptate nemo maiores?
                        </span>
                        <button className="register">
                            Register Now
                        </button>
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