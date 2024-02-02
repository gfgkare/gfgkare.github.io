import "../styles/NewEventRegister.scss";

import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import kluSquareLogo from "../assets/klu_square_logo.png";
import gfgSquareLogo from "../assets/gfgkare_square_logo.jpg";

export default function NewEventRegister() {


    return (
        <div className="newEventRegister">

            <section className="bigImageContainer">
                <div className="navigation">
					<Link className="logo" to={"/"} target="_blank" >
						GFG KARE
					</Link>
					<div className="links">
                        <a href="#about">About</a>
                        <a href="#rounds">Rounds</a>
                        <a href="#sponsors">Sponsors</a>
					</div>
                </div>

                <div className="text">
                    <div className="name gradientText">
                        <div className="year">Euphoria '24</div>
                        <div className="event">Codeathon</div>
                    </div>
                    <div className="shortAbout">
                        Contribute, code, compete, and WIN!
                    </div>
                    <button className="cta">
                        Register
                    </button>
                </div>
            </section>

            <section className="about" id="about">
                Codeathon, a challenging algorithmic event under EUPHORIA 2K24 held by Kalasalingam Academy of Research and Education.
                This competetion challenges and invites the participants all over the country to showcase their excellent problem-solving skills
                in the area Algorithmic Analysis and Competetive Programming.
            </section>

            <section className="rounds" id="rounds">
                <div className="round">
                    <div className="title">
                        Round 1
                    </div>
                    <div className="info">
                        <span>26th Match 2024 - 10AM</span>
                        <span>80 Participants</span>
                        <span>30 MCQs</span>
                    </div>
                </div>
                <div className="round">
                    <div className="title">
                        Round 2
                    </div>
                    <div className="info">
                        <span>26th Match 2024 - 4PM</span>
                        <span>40 Participants</span>
                        <span>3 Coding Questions</span>
                    </div>
                </div>
            </section>

            <section className="ctaReminder">
                <button className="cta">
                    Register Now!
                </button>
            </section>

			<section className="sponsors" id="sponsors">
                <div className="sponsorTitle">SPONSORS</div>

                <div className="sponsorsContainer">
                    <div className="sponsor klu">
                        <img src={kluSquareLogo} alt="" />
                    </div>
                    <div className="sponsor gfgkare">
                        <img src={gfgSquareLogo} alt="" />
                    </div>
                </div>
				
			</section>

            <Footer bgColor={"rgb(15,15,15)"} />
        </div>
    )
}