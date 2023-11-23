import "../styles/EventStatDashboard.scss";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import axios from "../scripts/axiosConfig";
import { useState } from "react";

import quizImage from "../assets/quix.jpeg";

export default function EventStatDashboard() {
    const { currentUser, USER_PRESENT } = useAuth();
    const [regStatus, setRegStatus] = useState("...");

    const eventRoundsInfo = [
        { roundImage: quizImage, roundName: "Quiz", roundDescription: "Get ready for a fun knowledge challenge! In our Quiz round on December 20, 2023 you'll answer 60 questions about 50 algorithms. Can you beat the clock?", roundStatus: "allow" },
        { roundImage: quizImage, roundName: "Seminar", roundDescription: "Share your coding expertise! During the Seminar round from Jan 7 to 9, 2024, you'll have 4-5 minutes to present an algorithm. Be the start of the show!", roundStatus: null },
        { roundImage: quizImage, roundName: "QnA Challenge", roundDescription: "Work together to solve problems in our Q&A Formation Round on Jan 28, 2024. Create tricky questions for others to answer. How good is your teamwork?", roundStatus: null },
        { roundImage: quizImage, roundName: "Debugging", roundDescription: "Time to tackle tricky bugs! In the Debugging round of Feb 28, 2024, you'll solve 10 questions. Can you outsmart the code?", roundStatus: null },
        { roundImage: quizImage, roundName: "Coding", roundDescription: "It's the ultimate showdown! Join the Grand Finale on Mar 20, 2024, and show off your coding skills. Be the coding champion!", roundStatus: null },
    ]

    useEffect(() => {
        if (USER_PRESENT()) {
            axios
                .post("/get_event_reg_status", {
                    userID: currentUser.uid,
                    eventID: "algo2024",
                })
                .then((res) =>
                    setRegStatus(
                        res.data.status === "Registered"
                            ? "Waiting"
                            : "Not Registered"
                    )
                );
        }
    }, [currentUser]);

    return (
        <div className="eventStatDashboard">
            {USER_PRESENT() ? (
                <>
                    <div className="event">
                        <div className="title">Algorithmist2024</div>
                        <div className="eventBoxes">
                            {
                                eventRoundsInfo.map((round, index) => {
                                    return (
                                        <div className={"round round" + (index+1) + ((round.roundStatus === "allow") ? " unlocked" : "")  }>
                                            <div className="content">
                                                <img className="roundImage" src={round.roundImage} alt="Round 1"
                                                />
                                                <div className="heading">
                                                    <div className="roundNo">{ "0" + (index+1) }</div>
                                                    <div className="roundName">{round.roundName}</div>
                                                </div>
                                                <div className="description">
                                                    {round.roundDescription}
                                                </div>
                                                {
                                                    (round.roundStatus === "allow") ? 
                                                    (
                                                        <div className="status ok">
                                                            You are shortlisted for this round!
                                                        </div>
                                                    )
                                                    : 
                                                    (
                                                        <></>
                                                    )
                                                }
                                                
                                            </div>
                                            {
                                                (round.roundStatus !== "allow") ? <div className="ribbon">Not unlocked yet</div> : <></>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            ) : (
                <div className="noUser">Sign in to view dashboard.</div>
            )}
        </div>
    );
}
