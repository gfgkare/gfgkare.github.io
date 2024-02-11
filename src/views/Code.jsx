import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import CodeSnippet from "../components/CodeSnippet";

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

import "../styles/Code.scss";
import { set } from "firebase/database";

const Code = () => {
    const { problemsList, problemsCode, finishRound } = useOutletContext();

    const handleRef = useRef(null);
    const runStatus = useRef(null);
    const languageSelect = useRef(null);

    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
    const [problemStatement, setProblemStatement] = useState(problemsList.value[0].problemStatement);
    const [inputOutputFormat, setInputOutputFormat] = useState(problemsList.value[0].inputOutputFormat);
    const [sampleInput, setSampleInput] = useState(problemsList.value[0].sampleInput);
    const [sampleOutput, setSampleOutput] = useState(problemsList.value[0].sampleOutput);
    const [editorCode, setEditorCode] = useState(problemsCode.value[0]);
    const [codeRunningStatus, setCodeRunningStatus] = useState("");

    const [flexValue, setFlexValue] = useState(0.4);
    const [chosenLanguage, setChosenLanguage] = useState("java");

    const [savingIndicator, setSavingIndicator] = useState("");
    

    const onChange = (newValue) => {
        console.log("new code: ", newValue);
        console.log("Changing  local comp variable code to: ", newValue);
        setEditorCode(newValue);

        console.log("Changing parent code array to", newValue)
        showLocalSaveIcon();
        problemsCode.value[selectedProblemIndex] = newValue;
    };

    const showLocalSaveIcon = () => {
        setSavingIndicator("saving locally...");
        setTimeout(() => {
            setSavingIndicator("");
        }, 1000);
    }

    const changeProblem = (index) => {
        showLocalSaveIcon();
        problemsCode.value[selectedProblemIndex] = editorCode;

        setSelectedProblemIndex(index);
        setProblemStatement(problemsList.value[index].problemStatement);
        setInputOutputFormat(problemsList.value[index].inputOutputFormat);
        setSampleInput(problemsList.value[index].sampleInput);
        setSampleOutput(problemsList.value[index].sampleOutput);
        setEditorCode(problemsCode.value[index])
    }

    const runCode = () => {
        runStatus.current.scrollIntoView();

        const eventSource = new EventSource('http://localhost:5000/run_code');

        eventSource.onopen = () => {
            console.log("EventStream Opened.")
        }

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            console.log(eventData);
            setCodeRunningStatus(eventData.message);

            if (eventData.isLastEvent === "true") {
                console.log("isLastEvent is true. Closing EventSource.")
                eventSource.close();
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        eventSource.onend = () => {
            console.log('EventSource connection closed');
        };
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

        return () => {
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
            <nav className="codeNav">
                <ul>
                    <li
                        className="navItem timer"
                        title="59 minutes 27 seconds remaining"
                    >
                        <span className="icon">59:27</span>
                        <span className="text">Time remaining</span>
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
                                    <option value="java">Java</option>
                                    <option value="c_cpp">C</option>
                                    <option value="c_cpp">C++</option>
                                    <option value="python">Python</option>
                                </select>
                                <button className="green" onClick={runCode}>
                                    Run
                                </button>
                                <button className="orange">Reset Code</button>
                            </div>
                        </div>

                        <div className="editor">
                            <AceEditor
                                value={editorCode}
                                mode={chosenLanguage}
                                width={"100%"}
                                theme="monokai"
                                onChange={onChange}
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
                                <button className="green" onClick={runCode}>
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
