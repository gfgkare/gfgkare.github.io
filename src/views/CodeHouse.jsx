import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import useArray from "../hooks/useArray";

import "../styles/CodeHouse.scss";

export default function CodeHouse() {

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const problemsList = useArray([
        {
            title: "Problem 1", 
            problemStatement: "1.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            inputOutputFormat: "1.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            sampleInput: "Problem 1 | 2 4 6 8 10 | 3 7 8",
            sampleOutput: "1 2 3 4 5",
        },
        {
            title: "Problem 2", 
            problemStatement: "2.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            inputOutputFormat: "2.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            sampleInput: "Problem 2 | 2 4 6 8 10",
            sampleOutput: "1 2 3 4 5",
        },
        {
            title: "Problem 3", 
            problemStatement: "3.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            inputOutputFormat: "3.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed a, at tempore provident, aspernatur animi architecto facere impedit facilis magni ducimus, minima quos! Molestias corrupti assumenda ab eius, tempore magnam.",
            sampleInput: "Problem 3 | 2 4 6 8 10 | 55 49 | 0 0 0 0 | 1 2 3 4",
            sampleOutput: "1 2 3 4 5",
        }
    ]);

    const problemsCode = useArray([
        "problem 1 code",
        "problem 2 code",
        "problem 3 code",
    ]);

    useEffect(() => {
        setTimeout(() => setLoadingPercentage(25), 1000);
        setTimeout(() => setLoadingPercentage(50), 2000);
        setTimeout(() => setLoadingPercentage(60), 3000);
        setTimeout(() => setLoadingPercentage(100), 5000);
        setTimeout(() => setLoadingStatus("done"), 6000);
    }, [])

    return (

        <div className="codeHouse">

            {
                (loadingStatus === 'loading') ? (
                    <div className="loadingScreen">
                        <div className="progressBar">
                            <div className="progressBar-thumb" style={{ width: `${loadingPercentage}%` }}></div>
                        </div>
                        <div className="loadingText">
                            Loading... Get Ready!
                        </div>
                    </div>
                ) : (
                    <Outlet context={ {problemsList, problemsCode} } />
                )
            }
            

        </div>

    )
}