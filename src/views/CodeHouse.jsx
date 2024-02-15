import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import useArray from "../hooks/useArray";
import { useAuth } from "../contexts/AuthContext";
import axios from "../scripts/axiosConfig.js";

import "../styles/CodeHouse.scss";

import { toast } from "react-toastify"


export default function CodeHouse() {

    const [userStatus, setUserStatus] = useState("out");
    const [pageToShow, setPageToShow] = useState("instructions");
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const allowedEmails = ["incrediblesabari02@gmail.com", "9922008342@klu.ac.in", "adiniparimal229@gmail.com"];

    const { currentUser } = useAuth();

    const problemsList = useArray([]);

    const problemsCode = useArray([]);

    const startRound = () => {
        setPageToShow("loading");
        // axios.post("/start_round4", {}, {headers: {Authorization: `${currentUser.accessToken}`}})
        // .then((res) => {
        //     setLoadingPercentage(100);
        //     problemsList.setValue(res.data.problems);
        //     setPageToShow("code");
        // })
        
        // const eventSource = new EventSource();
        setLoadingPercentage(30);
        axios.post(`${import.meta.env.VITE_API}/start_round4`, {}, {headers: {Authorization: `${currentUser.accessToken}`}})
        .then((response) => {
                console.log(response);

                if (response.data.message === "got_problems") {
                    setLoadingPercentage(100);
                    problemsList.setValue(response.data.problems);
                    setPageToShow("code");
                }
                else {
                    toast.error(response.data.message);
                    setLoadingPercentage(0);
                    console.log("Error: ", response.data.message);
                }


            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.error("Error fetching data:", error);
                console.log("Error: ", error.response.data.message);
            });
    }


    useEffect(() => {
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
                                    <button onClick={startRound}>
                                        Dev Force
                                    </button>
                                </div>

                            </>
                        ) : (
                            <></>
                        )
                    }
                    
                    {
                        (pageToShow === "code") ? (
                            <Outlet context={ { problemsList, problemsCode, saveEditorCodeLocally, finishRound } } />
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