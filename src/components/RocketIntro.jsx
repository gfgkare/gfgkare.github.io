import "../styles/RocketIntro.scss";

import rocketOutline from "../assets/rocket_fill-min.png";


export default function RocketIntro({ animationOver }) {

    return (
        <>
            <div className={`rocketIntro ${(animationOver) && 'unmount'}`}>

                <div className={`rain ${(animationOver) ? 'hidden' : ''}`}>
                    {
                        new Array(30).fill(0).map((_, i) => (
                            <div class="drop" key={i}></div>
                        ))
                    }
                </div>

                <div className="rocketContainer">
                    <img className={`rocketImage ${(animationOver) && 'nitro'}`} src={rocketOutline} loading="eager" />
                </div>

                <div className="text">
                    Preparing your environment...
                </div>
            </div>
        </>
        
    )

};