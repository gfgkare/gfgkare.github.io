import { useState, useEffect, useRef } from "react";

import CodeSnippet from "../components/CodeSnippet";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import 'ace-builds/src-noconflict/mode-c_cpp';

import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/c_cpp";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import "../styles/Code.scss";

const Code = () => {
    const handleRef = useRef(null);
    const runStatus = useRef(null);
    const languageSelect = useRef(null);

    const [flexValue, setFlexValue] = useState(0.4);
    const [chosenLanguage, setChosenLanguage] = useState("java");

    const [userCode, setUserCode] = useState('');


	const onChange = (newValue) => {
		console.log("change", newValue);
        setUserCode(newValue);
	}

    const runCode = () => {
        console.log(userCode);
        runStatus.current.scrollIntoView()
    }

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
                    <li className="navItem timer" title="59 minutes 27 seconds remaining">
                        <span className="icon">59:27</span>
                        <span className="text">Time remaining</span>
                    </li>
                    {[...Array(10)].map((e, i) => (
                        <li key={i} className="navItem">
                            <span className="icon">{i + 1}</span>
                            <span className="text">Qn Name</span>
                        </li>
                    ))}
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
                                Lorem ipsum dolor sit amet consectetur, adipisicing
                                elit. Sed a, at tempore provident, aspernatur animi
                                architecto facere impedit facilis magni ducimus,
                                minima quos! Molestias corrupti assumenda ab eius,
                                tempore magnam.
                            </div>
                        </div>

                        <div className="box inputOutputFormat">
                            <div className="title">Input/Output Format</div>
                            <div className="content">
                                Lorem ipsum dolor sit amet consectetur, adipisicing
                                elit. Sed a, at tempore provident, aspernatur animi
                                architecto facere impedit facilis magni ducimus,
                                minima quos! Molestias corrupti assumenda ab eius,
                                tempore magnam.
                            </div>
                        </div>

                        <div className="box sampleInput">
                            <div className="title">Sample Input</div>
                            <div className="content">
                                <CodeSnippet>
                                    <span>1 5</span>
                                    <span>2 4 6 8 10</span>
                                </CodeSnippet>
                            </div>
                        </div>

                        <div className="box outputFormat">
                            <div className="title">Sample Output</div>
                            <div className="content">
                                <CodeSnippet>
                                    <span>1 2 3 4 5</span>
                                </CodeSnippet>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="resizeHandle" ref={handleRef}>
                    ||
                </div>
                <div
                    className="codeEditor"
                    style={{ flex: 1 - flexValue }}
                >
                    <div className="editorContainer">

                        <div className="editorBars header">
                            <select onChange={(e) => setChosenLanguage(e.target.value)}>
                                <option value="java">Java</option>
                                <option value="c_cpp">C</option>
                                <option value="c_cpp">C++</option>
                                <option value="python">Python</option>
                            </select>
                            <button className="green" onClick={runCode}>Run</button>
                            <button className="orange">Reset Code</button>
                        </div>

                        <div className="editor">
                            <AceEditor
                                mode={chosenLanguage}
                                width={'100%'}
                                theme="monokai"
                                onChange={onChange}
                                name={"aceEditor"}
                                fontSize={14}
                                showPrintMargin={false}
                                showGutter={true}
                                debounceChangePeriod={2000}
                                annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.'}]}
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
                            <button className="green" onClick={runCode}>Run</button>
                            <button className="red">Finish</button>
                        </div>

                        <div className="runStatus" ref={runStatus}>
                            Running Code...
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Code;
