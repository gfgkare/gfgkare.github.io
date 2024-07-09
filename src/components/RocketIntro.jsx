import "../styles/RocketIntro.scss";

import rocketOutline from "../assets/rocket_outline.png";


export default function RocketIntro() {


    return (
        <>

            <div className="rocketIntro">

                <div class="rain">
                    {
                        new Array(30).fill(0).map((_, i) => (
                            <div class="drop" key={i}></div>
                        ))
                    }
                </div>
                <div className="rocketContainer">
                    <img className="rocketImage" src={rocketOutline} alt="" />
                </div>
                loading...


            </div>
        
        </>
        
    )

};