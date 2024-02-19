import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import CodeSnippet from "../components/CodeSnippet";
import axios from "../scripts/axiosConfig";
import { useAuth } from "../contexts/AuthContext";
import MessagePopup from "../components/MessagePopup";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/c_cpp";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { HiOutlineSave } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";

import "../styles/Code.scss";

import { toast } from "react-toastify";



const Code = () => {
    const { contestTime, contestName, setPageToShow, problemsList, problemsUserCode, finishRound } = useOutletContext();

    const { currentUser } = useAuth();

    const editorRef = useRef(null);
    const handleRef = useRef(null);
    const runStatus = useRef(null);
    const languageSelect = useRef(null);

    const timerIcon = useRef();
    const timerFullValue = useRef();

    const [codeTimerInterval, setCodeTimerInterval] = useState(null);

    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
    const [problemStatement, setProblemStatement] = useState(problemsList.value[0].problemStatement);
    const [inputOutputFormat, setInputOutputFormat] = useState(problemsList.value[0].inputOutput);
    const [sampleInput, setSampleInput] = useState(problemsList.value[0].sampleInput);
    const [sampleOutput, setSampleOutput] = useState(problemsList.value[0].sampleOutput);
    // const [editorCode, setEditorCode] = useState();
    const [codeRunningStatus, setCodeRunningStatus] = useState("");

    const [flexValue, setFlexValue] = useState(0.4);
    const [chosenLanguage, setChosenLanguage] = useState("JAVA8");

    const [savingIndicator, setSavingIndicator] = useState("");
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);    

    const saveUserCodeLocally = (problemIndex, code) => {
        console.log("new code: ", code);

        console.log("Changing parent problemsUserCode array to", code)
        showLocalSaveIcon();
        problemsUserCode.value[problemIndex] = code;
        console.log("changed global user code")
    };

    const showLocalSaveIcon = () => {
        setSavingIndicator("saving locally...");
        setTimeout(() => {
            setSavingIndicator("");
        }, 1000);
    }

    const logOutFromCurrentSession = () => {
        axios.post("/logout_from_session", { contest: contestName }, { headers: { Authorization: `${currentUser.accessToken}` } })
        .then((res) => {
            setPageToShow("loggedout");
        })
        .catch((err) => {
            toast.error(err);
            console.log("Error in logging out from contest: ");
            console.error(err);
        })
    }

    const changeProblem = (newIndex) => {
        showLocalSaveIcon();
        saveUserCodeLocally(selectedProblemIndex, editorRef.current.editor.getValue());
        setSelectedProblemIndex(newIndex);
        setProblemStatement(problemsList.value[newIndex].problemStatement);
        setInputOutputFormat(problemsList.value[newIndex].inputOutput);
        setSampleInput(problemsList.value[newIndex].sampleInput);
        setSampleOutput(problemsList.value[newIndex].sampleOutput);
        editorRef.current.editor.setValue( problemsUserCode.value[newIndex].replace(/\\n/g, '\n') );
    }

    const runCode = () => {
        runStatus.current.scrollIntoView();
        let editorCode = editorRef.current.editor.getValue();
        saveUserCodeLocally(selectedProblemIndex, editorCode);
        console.log(editorCode);

        if (!editorCode) {
            toast.error("Code cannot be empty.")
            return;
        }
        setCodeRunningStatus("Running code...");
        
        axios.post("/run_code", {
            code: editorCode,
            lang: chosenLanguage,
         })
         .then((res) => {
            console.log(res)
            setCodeRunningStatus(res["data"]["CODE_OUTPUT"]);
         })
         .catch((err) => {
            console.log("%c ERROR FROM CODE RUN API", "color: orange")
            console.log(err);

            if (err.response.data["SUCCESSFUL"] === false) {
                setCodeRunningStatus(`Error: ${err.response.data["MESSAGE"]}`)
            }
         });

        // const eventSource = new EventSource(import.meta.env.VITE_API + '/run_code');

        // eventSource.onopen = () => {
        //     console.log("EventStream Opened.")
        // }

        // eventSource.onmessage = (event) => {
        //     const eventData = JSON.parse(event.data);
        //     console.log(eventData);
        //     setCodeRunningStatus(eventData.message);

        //     if (eventData.isLastEvent === "true") {
        //         console.log("isLastEvent is true. Closing EventSource.")
        //         eventSource.close();
        //     }
        // };

        // eventSource.onerror = (error) => {
        //     console.error('EventSource failed:', error);
        //     eventSource.close();
        // };

        // eventSource.onend = () => {
        //     console.log('EventSource connection closed');
        // };
    };


    const formatTime = (seconds, returnFullTime) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (returnFullTime) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }
        else {
            if (hours > 0) {
                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            } else {
                return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            }
        }
        
      };

    useEffect(() => {
        setTimeout(() => setFlexValue(0.4), 10);

        const handleResize = (event) => {
            if (handleRef.current) {
                const parentRect =
                    handleRef.current.parentElement.getBoundingClientRect();
                const handleX = event.clientX - parentRect.left;
                const newFlexValue = handleX / parentRect.width;
                setFlexValue(newFlexValue);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        if (handleRef.current) {
            handleRef.current.addEventListener("mousedown", () => {
                document.addEventListener("mousemove", handleResize);
                document.addEventListener("mouseup", handleMouseUp);
            });
        }

        editorRef.current.editor.setValue(problemsList.value[0].code);

        let value = contestTime;
        let warnedLessThan10 = false;
        let warnedLessThan5 = false;
        let warnedLessThan1 = false;

        const timer = setInterval(() => {
            value--;
            if (value <= 1) {
                toast.info("Contest has ended.")
                clearInterval(timer);
                // save all the code, submit a run request, call logout function.
            }
            else if (value <= 60) {
                if (!warnedLessThan1) {
                    warnedLessThan1 = true;
                    toast.warn("Contest ends in less than one minute. Complete fast!");
                }
            }
            else if (value <= 300) {
                if (!warnedLessThan5) {
                    warnedLessThan5 = true;
                    toast.warn("Contest ends in less than 5 minutes.");
                }
            }
            else if (value <= 600) {
                if (!warnedLessThan10) {
                    warnedLessThan10 = true;
                    toast.info("Contest ends in less than 10 minutes.");
                }
            }
            timerIcon.current.innerText = formatTime(value);
            timerFullValue.current.innerText = formatTime(value, true);

        }, 1000);

        setCodeTimerInterval(timer);

        return () => {
            try {
                clearInterval(codeTimerInterval);
            }
            catch {}

            if (handleRef.current) {
                handleRef.current.removeEventListener("mousedown", () => {
                    document.removeEventListener("mousemove", handleResize);
                    document.removeEventListener("mouseup", handleMouseUp);
                });
            }
        };
    }, []);

    return (
        <div className="Code">
            {
                (showLogoutPopup) 
                ? 
                    <MessagePopup close={() => setShowLogoutPopup(false)} 
                                  title={"Are you sure you want to log out?"} 
                                  content={"Your code will be saved so you can continue in another device."}              
                                  buttons={
                                    [
                                        { label: "Log out", color: "red", onClick: () => logOutFromCurrentSession() },
                                        { label: "Cancel", color: "white", onClick: "close" }
                                    ]
                                  }
                    /> 
                : 
                    <></>
            }
            
            <nav className="codeNav">
                <ul>
                    <li
                        className="navItem timer"
                        title="Time remaining"
                    >
                        <span className="icon" ref={timerIcon}>00:00</span>
                        <span className="text" ref={timerFullValue}>00:00:00</span>
                    </li>
                    {problemsList.value.map((problemObj, index) => {
                        return (
                            <li key={index} className={("navItem" + ((selectedProblemIndex === index) ? " active" : "") )} onClick={() => {
                                changeProblem(index);
                                console.log(index);
                            } }>
                                <span className="icon">{index + 1}</span>
                                <span className="text">{problemObj.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div
                className="codeContent"
                style={{ display: "flex", height: "100%" }}
            >
                <div
                    className="questionContainerBox"
                    style={{ flex: flexValue }}
                >
                    <div className="questionContainer">
                        <div className="box problemStatement">
                            <div className="title">Problem Statement</div>
                            <div className="content">
                                {problemStatement}
                            </div>
                        </div>

                        <div className="box inputOutputFormat">
                            <div className="title">Input/Output Format</div>
                            <div className="content">
                                {inputOutputFormat}
                            </div>
                        </div>

                        <div className="box sampleInput">
                            <div className="title">Sample Input</div>
                            <div className="content">
                                <CodeSnippet codeSnippet={sampleInput} />
                            </div>
                        </div>

                        <div className="box outputFormat">
                            <div className="title">Sample Output</div>
                            <div className="content">
                                <CodeSnippet codeSnippet={sampleOutput} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="resizeHandle" ref={handleRef}>
                    ||
                </div>
                <div className="codeEditor" style={{ flex: 1 - flexValue }}>
                    <div className="editorContainer">
                        <div className="editorBars header">
                            
                            {
                                (savingIndicator) ? (
                                    <div className="saveIndicator">
                                        <HiOutlineSave />
                                        {savingIndicator}
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            
                            <div className="options">
                                <select
                                    onChange={(e) =>
                                        setChosenLanguage(e.target.value)
                                    }
                                >
                                    <option value="JAVA8">Java</option>
                                    <option value="CPP17">C++</option>
                                    <option value="PYTHON3">Python 3</option>
                                </select>
                                <button className="green" onClick={runCode} disabled={codeRunningStatus === "running code..."}>
                                    Run
                                </button>
                                <button className="orange" onClick={
                                    () => {
                                        editorRef.current.editor.setValue(problemsList.value[selectedProblemIndex].code)
                                    }
                                }>Reset Code</button>
                                <div className="logout" title="Log out" onClick={() => setShowLogoutPopup(true)} ><IoIosLogOut size={"20px"} /></div>
                            </div>
                        </div>

                        <div className="editor">
                            <AceEditor
                                ref={editorRef}
                                // value={editorCode}
                                mode={chosenLanguage}
                                width={"100%"}
                                theme="monokai"
                                // onChange={onChange}
                                name={"aceEditor"}
                                fontSize={14}
                                showPrintMargin={false}
                                showGutter={true}
                                debounceChangePeriod={2000}
                                annotations={[
                                    {
                                        row: 0,
                                        column: 2,
                                        type: "error",
                                        text: "Some error.",
                                    },
                                ]}
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                }}
                            />
                        </div>

                        <div className="editorBars bottomBar">
                            <div className="options">
                                <button className="green" onClick={runCode} disabled={codeRunningStatus === "running code..."}>
                                    Run
                                </button>
                                {
                                    (selectedProblemIndex === problemsList.value.length-1) ? (
                                        <button className="red" onClick={finishRound}>Finish</button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </div>

                        <div className="runStatus" ref={runStatus}>
                            {codeRunningStatus}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Code;
