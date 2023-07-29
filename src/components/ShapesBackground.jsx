

import Triangle from "../assets/Triangle.svg";
import Circle from "../assets/Circle.svg";
import Cube from "../assets/Cube.svg";

import "../styles/ShapesBackground.scss";

export default function ShapesBackground() {
    

    return (
        <div className="bubblesBg">
                <img src={Triangle} style={
                    {
                        position: "absolute",
                        top: `${Math.random()*100}%`,
                        left: `${Math.random()*100}%`,
                    }
                } />
                <img src={Circle} style={
                    {
                        position: "absolute",
                        top: `${Math.random()*100}%`,
                        left: `${Math.random()*100}%`,
                    }
                } />
                <img src={Cube} style={
                    {
                        position: "absolute",
                        top: `${Math.random()*100}%`,
                        left: `${Math.random()*100}%`,
                    }
                } />
            </div>
    )
}