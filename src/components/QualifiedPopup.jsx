import { useState, useEffect } from "react";
import "../styles/QualifiedPopup.scss";
import rocketSvg from "../assets/rocket.webp"


export default function QualifiedPopup(props) {

    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        setAnimationClass("visible");
    }, []);

    const closePopup = () => {
        setAnimationClass("closed");
        setTimeout(() => {
            props.close();
        }, 200)
    }

    return (
        <div className={"qualifiedPopup " + animationClass}>

            <button className="close" onClick={closePopup}>X</button>
            
            <div className="box">

                <div className="greet">Congratulations {props.name}!</div>
                <img src={rocketSvg} alt="" />
                <div className="qualifiedMessage">You have <span className="rainbow rainbow_text_animated"> qualified </span> for Round 2 of Algorithmist'24!</div>
            </div>

        </div>
    )
}