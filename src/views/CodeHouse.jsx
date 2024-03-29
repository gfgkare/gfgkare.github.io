import { useState, useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"

import useArray from "../hooks/useArray";
import { useAuth } from "../contexts/AuthContext";
import axios from "../scripts/axiosConfig.js";

import "../styles/CodeHouse.scss";

import { toast } from "react-toastify"

export default function CodeHouse() {

    const [userStatus, setUserStatus] = useState("out");
    const [pageToShow, setPageToShow] = useState("instructions");
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [contestName, setContestName] = useState("")
    const [contestTime, setContestTime] = useState(0);

    const allowedEmails = ["incrediblesabari02@gmail.com", "9922008342@klu.ac.in", "adiniparimal229@gmail.com"];

    const { currentUser } = useAuth();
    const params = useParams();

    const problemsList = useArray([]);
    const problemsUserCode = useArray([]);



    const startRound = () => {
        setPageToShow("loading");
        document.documentElement.requestFullscreen();

        setLoadingPercentage(30);
        axios.post(`${import.meta.env.VITE_API}/start_round4`, { contest: contestName }, {headers: {Authorization: `${currentUser.accessToken}`}})
        .then((response) => {
                console.log(response);

                if (response.data.message === "got_problems") {
                    setLoadingPercentage(100);
                    setContestTime(response.data.time);
                    problemsList.setValue(response.data.problems);
                    console.log("%cGETTING DATA ABOUT PROBLEMS")
                    console.log(response.data.problems);
                    response.data.problems.map((problem, index) => {
                        problemsUserCode.value[index] = problem.code;
                    })
                    setPageToShow("code");
                }
                else {
                    setPageToShow("instructions");
                    toast.error(response.data.message || response.data.error);
                    setLoadingPercentage(0);
                    console.log("Error: ", response.data.message || response.data.error);
                }


            })
            .catch((error) => {
                setPageToShow("instructions");
                console.log("catch")
                toast.error(error?.response?.data?.message || error?.response?.data?.error || "Something went wrong." );
                console.error("Error fetching data:", error);
                console.log("Error: ", error.response.data.message || error.response.data.error);
            });
    }


    useEffect(() => {
        if (currentUser && currentUser !== "none") {
            setUserStatus("approved");
            // if (allowedEmails.includes(currentUser.email)) {
            //     setUserStatus("approved");
            // }
            // else {
            //     setUserStatus("rejected");
            // }
        }
        else {
            setUserStatus("out");
        }
    })

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser);
        setContestName(params.eventname);

        return () => {
          window.removeEventListener('beforeunload', alertUser);
        }
      }, [])

    useEffect(() => {
        if (pageToShow !== "code") {
            console.log("removing alertUser");
            window.removeEventListener('beforeunload', alertUser);
        }
        else {
            console.log("adding alertUser");
            window.addEventListener('beforeunload', alertUser);
        }
    }, [pageToShow])

      const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
      }

      const finishRound = (finishTime) => {
        axios.post(`${import.meta.env.VITE_API}/finish_round4`, { contest: contestName, time: finishTime }, {headers: {Authorization: `${currentUser.accessToken}`}})
        .then((response) => {   
            console.log(response);
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message || error?.response?.data?.error || "Something went wrong." );
            console.error("Error fetching data:", error);
        });
        
        document.exitFullscreen();
        window.removeEventListener('beforeunload', alertUser);
        console.log("set to true");
        setPageToShow("finished");
      }

      const saveEditorCodeLocally = (problemIndex, editorCode) => {
        console.log("CodeHouse: setting code locally...");
        console.log(editorCode);
        problemsList.value[problemIndex].code = editorCode;
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
                                                <li>This is a proctored contest.</li>
                                                <li>Do not exit from the page.</li>
                                                <li>Do not switch tabs.</li>
                                                <li>Copy and Pasting code is disabled.</li>
                                                <li>Do not try to login and participate in two devices at the same time.</li>
                                                <li>But most importantly, be calm and have fun! :)</li>
                                            </ol>
                                        </div>
                                        <button className="startRoundBtn" onClick={startRound} disabled={pageToShow === "loading"}>
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
                            (pageToShow === 'loggedout') ? (
                                    <div className="instructions">
                                        <div className="title">You have logged out!</div>
                                        <div className="points">
                                            You have logged out from the page. You can continue the contest in another device.
                                        </div>
                                    </div>
                            ) : (
                                <></>
                            )
                        }

                        
                        {
                            (pageToShow === 'ended') ? (
                                        <div className="instructions">
                                            <div className="title">The contest has ended!</div>
                                            <div className="points">
                                                Thank you for participating. We hope you had fun! Results will be released shortly.
                                            </div>
                                        </div>
                                ) : (
                                    <></>
                                )
                        }

                        {
                            (pageToShow === 'finished') ? (
                                        <div className="instructions">
                                            <div className="title">You have finished the contest!</div>
                                            <div className="points">
                                                Thank you for participating. We hope you had fun! Results will be released shortly.
                                            </div>
                                        </div>
                                ) : (
                                    <></>
                                )
                        }


                        {
                            (pageToShow === 'malpractice') ? (
                                        <div className="instructions">
                                            <div className="title">You have been eliminated!</div>
                                            <div className="points">
                                                You have been eliminated from the contest. Contact the event coordinators.
                                            </div>
                                        </div>
                                ) : (
                                    <></>
                                )
                        }

                        
                    
                        {
                            (pageToShow === "code") ? (
                                <Outlet context={ { contestName, setPageToShow, problemsList, problemsUserCode, contestTime, saveEditorCodeLocally, finishRound } } />
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