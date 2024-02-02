import { useState, useEffect, useRef } from "react";


import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "../styles/Code.scss";

const Code = () => {
    const handleRef = useRef(null);
    const [flexValue, setFlexValue] = useState(0.4);
	
	function onChange(newValue) {
		console.log("change", newValue);
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
                    <li>Back</li>
                    {[...Array(10)].map((e, i) => (
                        <li key={i}>{i + 1}</li>
                    ))}
                </ul>
            </nav>
            <div
                className="codeContent"
                style={{ display: "flex", height: "100%" }}
            >
                <div
                    className="questionContainer"
                    style={{ flex: flexValue, border: "1px solid black" }}
                >
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
                        <div className="title">Input/Output Fornat</div>
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Sed a, at tempore provident, aspernatur animi
                            architecto facere impedit facilis magni ducimus,
                            minima quos! Molestias corrupti assumenda ab eius,
                            tempore magnam.
                        </div>
                    </div>

					<div className="box outputFormat">
                        <div className="title">Sample Output</div>
                        <div className="content">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Sed a, at tempore provident, aspernatur animi
                            architecto facere impedit facilis magni ducimus,
                            minima quos! Molestias corrupti assumenda ab eius,
                            tempore magnam.
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
                    <div className="editorBars header">
						<button>Submit</button>
						<button>Reset Code</button>
					</div>

					<div className="editor">
						<AceEditor
							mode="java"
							theme="github"
							onChange={onChange}
							name="aceEditor"
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
					
					<div className="editorBars bottomBar">
						<button>Submit</button>
						<button>Reset Code</button>
					</div>

					<div className="runStatus">
						Running Code...
					</div>

                </div>
            </div>
        </div>
    );
};

export default Code;
