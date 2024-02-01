import "../styles/NewEventRegister.scss";

import Footer from "../components/Footer";

export default function NewEventRegister() {


    return (
        <div className="newEventRegister">

            <section className="bigImageContainer">
                <div className="navigation">
					<div className="logo">
						X
					</div>
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
				<div className="klu">KLU</div>
				<div className="gfgkare">GFG KARE</div>
			</section>

            <Footer bgColor={"rgb(15,15,15)"} />
        </div>
    )
}