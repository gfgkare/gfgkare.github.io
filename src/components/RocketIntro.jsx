import "../styles/RocketIntro.scss";

import rocketOutline from "../assets/landing_page_elements/rocket_fill-min.png";
import { useEffect } from "react";


export default function RocketIntro({ animationOver }) {


    // useEffect(() => {
    //     if (animationOver) {
    //         document.body.style.overflow = "hidden"
    //     }
    //     else {
    //         document.body.style.overflow = "auto"
    //     }
    // }, [animationOver])

    return (
        <>
            <div className={`rocketIntro ${(animationOver) && 'unmount'}`}>

                <div className={`rain ${(animationOver) ? 'hidden' : ''}`}>
                    {
                        new Array(30).fill(0).map((_, i) => (
                            <div className="drop" key={i}></div>
                        ))
                    }
                </div>

                <div className="rocketContainer">
                    <img className={`rocketImage ${(animationOver) && 'nitro'}`} src={rocketOutline} loading="eager" />
                </div>

                <div className="text">
                    <div className="title">GFG KARE</div>
                    <div>Preparing your environment...</div>
                </div>
            </div>
        </>
        
    )

};