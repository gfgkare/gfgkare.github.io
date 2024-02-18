import { useState, useEffect } from "react";
import "../styles/MessagePopup.scss";
import { Link } from "react-router-dom";


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

                <div className="title">{props.title}</div>
                <div className="content">{props.content}</div>

                <div className="buttonsRow">
                    {
                        (props.buttons.map((button, index) => {
                            return (
                                <button key={index} className={button.color} onClick={ () => (button.onClick === "close") ? closePopup() : button.onClick() }>{button.label}</button>
                            )
                        }))
                    }
                </div>

            </div>

        </div>
    )
}