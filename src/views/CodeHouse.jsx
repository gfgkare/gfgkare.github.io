import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import useArray from "../hooks/useArray";
import {useAuth} from "../contexts/AuthContext";

import "../styles/CodeHouse.scss";

export default function CodeHouse() {

    const [userStatus, setUserStatus] = useState("out");
    const [pageToShow, setPageToShow] = useState("instructions");
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const allowedEmails = ["incrediblesabari02@gmail.com", "9922008342@klu.ac.in"];

    const { currentUser } = useAuth();

    const problemsList = useArray([
        {
            title: "Alice and Bob", 
            problemStatement: "Alice and Bob are studying for their computer science exam, and they are practicing solving dynamic programming problems. Alice is working on a problem related to finding the Longest Common Subsequence (LCS) between two strings. She wants to test her code with different inputs.",
            inputOutputFormat: "Input consists of two lines each containing string A and B. Output the LCS in a single line.",
            sampleInput: " ABCDEF | ACDE",
            sampleOutput: "4",
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

    const startRound = () => {
        setPageToShow("loading");
        setTimeout(() => setLoadingPercentage(25), 1000);
        setTimeout(() => setLoadingPercentage(50), 2000);
        setTimeout(() => setLoadingPercentage(60), 3000);
        setTimeout(() => setLoadingPercentage(100), 5000);
        setTimeout(() => setPageToShow("code"), 6000);
    }


    useEffect(() => {
        console.log("currentUser", currentUser);
        if (currentUser && currentUser !== "none") {
            if (allowedEmails.includes(currentUser.email)) {
                setUserStatus("approved");
            }
            else {
                setUserStatus("rejected");
            }
        }
        else {
            setUserStatus("out");
        }
    })

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
          window.removeEventListener('beforeunload', alertUser)
        }
      }, [])

      const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
      }

      const finishRound = e => {
        window.removeEventListener('beforeunload', alertUser);
        console.log("set to true");
        setPageToShow("instructions");
      }


    return (

        <div className="codeHouse">
            {
                (userStatus === "approved") ? (
                    <>
                        {
                        (pageToShow === 'instructions' || pageToShow === 'loading') ? (
                            <>
                                {
                                    (pageToShow === "loading") ? (
                                        <div className="progressBar">
                                            <div className="progressBar-thumb" style={{ width: `${loadingPercentage}%` }}></div>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            
                                <div className="instructions">
                                    <div className="title">READ ME!</div>
                                    <div className="points">
                                        <ol>
                                            <li>Do not exit from the page. You will die.</li>
                                            <li>Do not try to switch tabs. You will die.</li>
                                            <li>Do not try to copy and paste in the code editor. You will die.</li>
                                            <li>Do not try to logout and login in your own or your friends' laptops. You will die.</li>
                                            <li>Have fun! :)</li>
                                        </ol>
                                    </div>
                                    <button onClick={startRound} disabled={pageToShow === "loading"}>
                                        {
                                            (pageToShow === "instructions") ? "Start" : "..."
                                        }
                                    </button>
                                </div>

                            </>
                        ) : (
                            <></>
                        )
                    }
                    
                    {
                        (pageToShow === "code") ? (
                            <Outlet context={ { problemsList, problemsCode, finishRound } } />
                        ) : (
                            <></>
                        )
                    }
                    </>
                ) : (
                    <></>
                )
            }
            {
                (userStatus === "rejected") ? (
                    <div className="rejected">
                        <div className="title">Sorry!</div>
                        <div className="points">
                            <ul>
                                <li>Your email ({currentUser.email}) is not allowed to participate in this event.</li>
                                <li>Kindly contact the event organizers for more details.</li>
                                <li>
                                    <Link to={"/profile"} state={{from: location.pathname}} >Sign in with another email?</Link>
                                    {/* im tired. 'a' not getting margin even if i mention in css, wrapping in li to inherit li properties to get some spacing. */}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            {
                (userStatus === "out") ? (
                    <div className="out">
                        <div className="title">You are not logged in.</div>
                        <div>
                            You are not logged in. Please <Link to={"/profile"} state={{from: location.pathname}} >Sign in</Link> to continue.
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>

    )
}