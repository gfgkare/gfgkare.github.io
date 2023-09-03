import { useState, useEffect } from "react";

export default function Bubble() {
    const [topVal, setTopVal] = useState("97%");

    const [leftVal] = useState(`${10 + Math.floor(Math.random() * 80)}%`);
    const [size] = useState(`${10 + Math.floor(Math.random() * 40)}px`);

    useEffect(() => {
        setTimeout(() => {
            setTopVal(`${20 + Math.floor(Math.random() * 50)}%`);
        }, 50);
    }, []);

   
    return (
        <div
            className={"bubble c" + Math.floor(1 + Math.random() * 6)}
            onLoad={() => console.log("Bubble loaded")}
            style={{
                height: size,
                width: size,
                left: leftVal,
                top: topVal,
            }}
        ></div>
    );
}
