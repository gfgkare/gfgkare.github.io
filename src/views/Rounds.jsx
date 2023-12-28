import Fade from "../components/Fade"
import { useState, useEffect } from "react";

import { PiCircleFill, PiTriangleFill, PiSquareFill, PiDiamondFill } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { TbPentagonFilled } from "react-icons/tb";

import "../styles/Rounds.scss";

export default function Rounds() {
    
    const [activeRound, setActiveRound] = useState(1);

    const roundInfo = [
        {
            icon: <PiCircleFill className="icon" />,
            name: "Round 1 - Quiz",
            where: "Seminar Hall",
            date: "Dec 20 2023",
            time: "4PM - 6PM",
            description: "lorem ipsum"
        },
        {
            icon: <PiTriangleFill className="icon" />,
            name: "Round 2 - Seminar",
            where: "Seminar Hall",
            date: "Dec 20 2023",
            time: "4PM - 6PM",
            description: "lorem ipsum"
        },
        {
            icon: <PiSquareFill className="icon" />,
            name: "Round 3 - QA",
            where: "Seminar Hall",
            date: "Dec 20 2023",
            time: "4PM - 6PM",
            description: "lorem ipsum"
        },
        {
            icon: <PiDiamondFill className="icon" />,
            name: "Round 4 - Debugging",
            where: "Seminar Hall",
            date: "Dec 20 2023",
            time: "4PM - 6PM",
            description: "lorem ipsum"
        },
        {
            icon: <TbPentagonFilled className="icon" />,
            name: "Round 5 - Coding",
            where: "Seminar Hall",
            date: "Dec 20 2023",
            time: "4PM - 6PM",
            description: "lorem ipsum"
        },
    ]

    useEffect(() => {
        console.log("Rounds init.");
    })

    return (

        <Fade>

            <h1 className="roundsTitle">Rounds Info</h1>

            <div className="roundsContainer">

                {
                    (roundInfo.map((round, index) => {
                        return (
                            <div className={"round round" + (index+1) + ( (activeRound === index+1) ? " active" : ""  ) } key={index}>
                                <div className="header"  onClick={() => setActiveRound( (activeRound === (index+1)) ? 0 : (index+1))}>
                                    {round.icon}
                                    {round.name}  
                                    <FaAngleDown className="dropdown" />
                                </div>
                                <div className="roundBody">
                                    <div className="whereAndWhen">
                                        <div className="where">
                                            <h2>Where</h2> {round.where}
                                        </div>
                                        <div className="split"></div>
                                        <div className="when">
                                            <h2>When</h2> 
                                            <span>{round.date}</span>
                                            <span>{round.time}</span>                                
                                        </div>
                                    </div>

                                    <div className="description">{round.description}</div>
                                </div>
                            </div>
                        )
                    }))
                }
{/*                 
                <div className={"round round1 " + ( (activeRound === 1) ? "active" : ""  ) }>
                    <div className="header">
                        <PiCircleFill className="icon" />
                        Round 1  
                        <FaAngleDown className="dropdown" onClick={() => setActiveRound( (activeRound === 1) ? 0 : 1)} />
                    </div>
                    <div className="roundBody">
                        <div className="whereAndWhen">
                            <div className="where">
                                <h2>Where</h2> Seminar Hall
                            </div>
                            <div className="split"></div>
                            <div className="when">
                                <h2>When</h2> 5 - 7 PM
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={"round round2 " + ( (activeRound === 2) ? "active" : ""  ) }>
                    <div className="header">
                        <PiTriangleFill className="icon" />
                        Round 2
                        <FaAngleDown className="dropdown" onClick={() => setActiveRound( (activeRound === 2) ? 0 : 2)} />
                    </div>
                    <div className="roundBody">
                        <div className="whereAndWhen">
                            <div className="where">
                                <h2>Where</h2> Seminar Hall
                            </div>
                            <div className="split"></div>
                            <div className="when">
                                <h2>When</h2> 
                                <span>Dec 20 2023</span>
                                <span>4PM - 6PM</span>                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"round round3 " + ( (activeRound === 3) ? "active" : ""  ) }>
                    <div className="header">
                        <PiSquareFill className="icon" />
                        Round 3
                        <FaAngleDown className="dropdown" onClick={() => setActiveRound( (activeRound === 3) ? 0 : 3)} />
                    </div>
                    <div className="roundBody">
                        <div className="whereAndWhen">
                            <div className="where">
                                <h2>Where</h2> Seminar Hall
                            </div>
                            <div className="split"></div>
                            <div className="when">
                                <h2>When</h2> 5 - 7 PM
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={"round round4 " + ( (activeRound === 4) ? "active" : ""  ) }>
                    <div className="header">
                        <PiDiamondFill className="icon" />
                        Round 4
                        <FaAngleDown className="dropdown" onClick={() => setActiveRound( (activeRound === 4) ? 0 : 4)} />
                    </div>
                    <div className="roundBody">
                        <div className="whereAndWhen">
                            <div className="where">
                                <h2>Where</h2> Seminar Hall
                            </div>
                            <div className="split"></div>
                            <div className="when">
                                <h2>When</h2> 5 - 7 PM
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={"round round5 " + ( (activeRound === 5) ? "active" : ""  ) }>
                    <div className="header">
                        <TbPentagonFilled className="icon" />
                        Round 5
                        <FaAngleDown className="dropdown" onClick={() => setActiveRound( (activeRound === 5) ? 0 : 5)} />
                    </div>
                    <div className="roundBody">
                        <div className="whereAndWhen">
                            <div className="where">
                                <h2>Where</h2> Seminar Hall
                            </div>
                            <div className="split"></div>
                            <div className="when">
                                <h2>When</h2> 5 - 7 PM
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>


        </Fade>

    )
}