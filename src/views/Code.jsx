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
import { AiOutlineLoading } from "react-icons/ai";

import "../styles/Code.scss";

import { toast } from "react-toastify";
import useArray from "../hooks/useArray";



const Code = () => {
    const { contestTime, contestName, setPageToShow, problemsList, problemsUserCode, finishRound } = useOutletContext();
    const [testcaseResults, setTestcaseResults] = useState(
        [
            {
                testCase0Output: "NA",
                passedTestcases: ["NA", "NA", "NA"]
            },
            {
                testCase0Output: "NA",
                passedTestcases: ["NA", "NA", "NA"]
            },
            {
                testCase0Output: "NA",
                passedTestcases: ["NA", "NA", "NA"]
            },
            {
                testCase0Output: "NA",
                passedTestcases: ["NA", "NA", "NA"]
            },
            {
                testCase0Output: "NA",
                passedTestcases: ["NA", "NA", "NA"]
            }
        ]
    );

    const { currentUser } = useAuth();

    const editorRef = useRef(null);
    const handleRef = useRef(null);
    const runStatus = useRef(null);

    const timerIcon = useRef();
    const timerFullValue = useRef();

    const [codeTimerInterval, setCodeTimerInterval] = useState(null);

    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
    const [problemStatement, setProblemStatement] = useState(problemsList.value[0].problemStatement);
    const [inputOutputFormat, setInputOutputFormat] = useState(problemsList.value[0].inputOutput);
    const [sampleInput, setSampleInput] = useState(problemsList.value[0].sampleInput);
    const [sampleOutput, setSampleOutput] = useState(problemsList.value[0].sampleOutput);

    const [codeRunningStatus, setCodeRunningStatus] = useState("");
    const [runButtonDisabled, setRunButtonDisabled] = useState(false);
    const [runMessage, setRunMessage] = useState("Submitted in queue...")

    const [flexValue, setFlexValue] = useState(0.4);

    const [chosenLanguage, setChosenLanguage] = useState("JAVA8");
    const [prevChosenLanguage, setPrevChosenLanguage] = useState(chosenLanguage);
    const [initialRenderCall, setInitialRenderCall] = useState(true);

    const [savingIndicator, setSavingIndicator] = useState("");
    const [showMessagePopup, setShowMessagePopup] = useState(false);

    const [popupTitle, setPopupTitle] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [popupButtons, setPopupButtons] = useState(null);


    const openMessagePopup = (title, content, buttons) => {
        setPopupTitle(title);
        setPopupContent(content);
        setPopupButtons(buttons);
        setShowMessagePopup(true);
    }

    const saveUserCodeLocally = (problemIndex, code, prevChosenLanguage) => {
        console.log(`%c new code: ${code}`, "color: orange");

        console.log(`Changing parent problemsUserCode ${chosenLanguage} array to`, code)
        showLocalSaveIcon();
        console.log( (prevChosenLanguage) ? "saving in previous language" : "saving in current language." )
        problemsUserCode.value[problemIndex][ prevChosenLanguage || chosenLanguage] = code;
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
        setCodeRunningStatus(testcaseResults[newIndex].testCase0Output);
        setProblemStatement(problemsList.value[newIndex].problemStatement);
        setInputOutputFormat(problemsList.value[newIndex].inputOutput);
        setSampleInput(problemsList.value[newIndex].sampleInput);
        setSampleOutput(problemsList.value[newIndex].sampleOutput);
        console.log("Setting editor code to:")
        console.log(problemsUserCode.value)
        editorRef.current.editor.setValue( problemsUserCode.value[newIndex][chosenLanguage].replace(/\\n/g, '\n') );
    }

    // ON LANGUAGE CHANGE
    useEffect(() => {
        console.log("%c LANGUAGE CHANGED", "color: pink");
        if (initialRenderCall) {
            console.log("%c Initial render call, ignoring.", "color: pink");
            setInitialRenderCall(false);
            return;
        }
        console.log(chosenLanguage, " -> " ,prevChosenLanguage)
        saveUserCodeLocally(selectedProblemIndex, editorRef.current.editor.getValue(), prevChosenLanguage);
        editorRef.current.editor.setValue( problemsUserCode.value[selectedProblemIndex][chosenLanguage].replace(/\\n/g, '\n') );
    }, [chosenLanguage])

    const runCode = () => {
        let editorCode = editorRef.current.editor.getValue();
        if (!editorCode) {
            toast.error("Code cannot be empty.")
            return;
        }
        setRunButtonDisabled(true);
        setTimeout(() => {
            console.log("enable btn");
            setRunButtonDisabled(false);
        }, 15000);

        runStatus.current.scrollIntoView();
        saveUserCodeLocally(selectedProblemIndex, editorCode);
        console.log(editorCode);

        setCodeRunningStatus("Running code...");
        
        axios.post("/run_code", {
            code: editorCode,
            lang: chosenLanguage,
            contest: contestName,
            qnID: problemsList.value[selectedProblemIndex].title
         })
         .then((res) => {
            console.log(res)
            setCodeRunningStatus(res["data"]["CODE_OUTPUT"]);
            let tempArray = [...testcaseResults];

            tempArray[selectedProblemIndex] = {
                testCase0Output: res["data"]["CODE_OUTPUT"],
                passedTestcases: res["data"]["PASSED_TESTCASES"]
            };

            setTestcaseResults(tempArray);

         })
         .catch((err) => {
            console.log("%c ERROR FROM CODE RUN API", "color: orange")
            console.log(err);
            toast.error(err.message)

            if (err.response.data["SUCCESSFUL"] === false) {
                setCodeRunningStatus(`Error: ${err.response.data["MESSAGE"]}`)
            }
         });
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
        setCodeRunningStatus( testcaseResults[selectedProblemIndex].testCase0Output )

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

        editorRef.current.editor.setValue(problemsUserCode.value[0][chosenLanguage]);

        let value = contestTime;
        let warnedLessThan10 = false;
        let warnedLessThan5 = false;
        let warnedLessThan1 = false;

        const timer = setInterval(() => {
            value--;
            if (value <= 0) {
                toast.info("Contest has ended.")
                clearInterval(timer);
                // save all the code, submit a run request, call logout function.
                openMessagePopup(
                    "Saving your progress...",
                    "The contest has ended. Your progress is being automatically saved. Please do not close the tab until this process completes.",
                    []
                )
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


    useEffect(() => {
        if (codeRunningStatus === "Running code...") {
            setRunMessage("Queueud...");
            setTimeout(() => {
                setRunMessage("Executing your code...");
            }, 1500);
            setTimeout(() => {
                setRunMessage("Fetching results....");
            }, 4000);
        }
    }, [codeRunningStatus])

    return (
        <div className="Code">
            {
                (showMessagePopup) 
                ? 
                    <MessagePopup 
                        close={() => setShowMessagePopup(false)} 
                        title={popupTitle} 
                        content={popupContent}              
                        buttons={popupButtons}
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
                                    onChange={(e) => {
                                        setPrevChosenLanguage(chosenLanguage);
                                        setChosenLanguage(e.target.value);
                                        console.log(chosenLanguage, e.target.value);
                                    }}
                                >
                                    <option value="JAVA8">Java</option>
                                    <option value="CPP17">C++</option>
                                    <option value="PYTHON3">Python 3</option>
                                </select>
                                <button className="green" onClick={runCode} disabled={runButtonDisabled}>
                                    Run
                                </button>
                                <button className="orange" onClick={
                                    () => {
                                        // editorRef.current.editor.setValue(problemsList.value[selectedProblemIndex].code)
                                        console.log(problemsList.value[selectedProblemIndex].code);
                                        console.log("-------------")
                                        console.log(problemsUserCode.value[selectedProblemIndex]);
                                    }
                                }>Reset Code</button>
                                <div className="logout" title="Log out" onClick={() => {
                                    openMessagePopup(
                                        "Are you sure you want to log out?", 
                                        "Your progress will be saved.",
                                        [
                                            { label: "Log out", onClick: logOutFromCurrentSession, color: "red" }, 
                                            { label: "cancel", onClick: "close", color: "white" }
                                        ]
                                    )
                                }} ><IoIosLogOut size={"20px"} /></div>
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
                                <button className="green" onClick={runCode} disabled={runButtonDisabled}>
                                    Run
                                </button>
                                {
                                    (selectedProblemIndex === problemsList.value.length-1) ? (
                                        <button className="red" onClick={
                                            () => {
                                                openMessagePopup(
                                                    "Are you sure you want to finish the contest?", 
                                                    "Your progress will be saved.",
                                                    [
                                                        { label: "Finish", onClick: finishRound, color: "red" }, 
                                                        { label: "cancel", onClick: "close", color: "white" }
                                                    ]
                                                )
                                            }
                                        }>Finish</button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </div>

                        <div className="runStatus" ref={runStatus}>
                            {
                                (codeRunningStatus !== "Running code...") ? (
                                    <>
                                    <div className="testcase0Output">
                                        <div className="panel">
                                            <div className="title">Testcase 0 Output</div>
                                            <div className="result">
                                                {codeRunningStatus}
                                            </div>
                                        </div>
                                        <div className="panel">
                                            <div className="title">Expected Output</div>
                                            <div className="result">
                                                {sampleOutput}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="testCasesPassed"
                                        onClick={() => {
                                            console.log(
                                                testcaseResults[selectedProblemIndex]
                                            )
                                        }}
                                    >
                                        Testcases passed: {testcaseResults[selectedProblemIndex].passedTestcases.filter(x => x === 'PASSED').length || 0}/3
                                    </div>
                                    
                                    <div className="hiddenTestCases">
                                        {
                                            [0,1,2].map((index) => {
                                                return (
                                                    <div className="testCase" key={index}>
                                                        <div className="left">Testcase {index}</div>
                                                        <div className={`right ${testcaseResults[selectedProblemIndex].passedTestcases[index]}`}>{testcaseResults[selectedProblemIndex].passedTestcases[index]}</div>
                                                    </div>      
                                                )
                                            })
                                        }
                                    </div>
                                    </>
                                ) : (
                                    <div className="runningCode">
                                        <AiOutlineLoading className="runLoader" size="50px" />
                                        {runMessage}
                                    </div>
                                )
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Code;
