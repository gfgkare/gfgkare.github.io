import Triangle from "../assets/Triangle.svg";
import Circle from "../assets/Circle.svg";
import Cube from "../assets/Cube.svg";

import "../styles/ShapesBackground.scss";

export default function ShapesBackground() {
    function rand(min, max) {
        console.log(Math.floor(Math.random() * (max - min + 1)) + min)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="bubblesBg">
            {[...Array(rand(1,2))].map(() => {
                return (
                    <img
                        src={Triangle}
                        style={{
                            position: "absolute",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                );
            })}

            {[...Array(rand(1,2))].map(() => {
                return (
                    <img
                        src={Circle}
                        style={{
                            position: "absolute",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                );
            })}

            {[...Array(rand(1,3))].map(() => {
                return (
                    <img
                        src={Cube}
                        style={{
                            position: "absolute",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                );
            })}
        </div>
    );
}
