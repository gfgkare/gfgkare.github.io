import { useEffect } from "react";
import useArray from "../hooks/useArray";
import "../styles/CustomTable.scss";

import { useState, useRef } from "react";
import { useDebounce } from "use-debounce";



export default function CustomTable(props) {

    const headerMap = {
        "rank": "Rank",
        "regNo": "Register Number",
        "section1": "Section 1 Marks",
        "section2": "Section 2 Marks",
        "section3": "Section 3 Marks",
        "overallMarks": "Total",
        "completionTime": "Completion Time (mm.ss)",
        "explanation": "Explanation Marks",
        "complexity": "Complexity Marks",
        "realtime": "Realtime Application Marks",
        "viva": "Viva Marks",
        "score": "Score"
    }

    const [startIndex, setStartIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(10);

    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue] = useDebounce(searchValue, 500);

    const filteredRows = useArray(props.rows);

    const pageInput = useRef();

    const goToPage = (index) => {
        index++

        if (index == 1) {
            setStartIndex(0)
            setStopIndex(10)
        }
        else {
            setStartIndex( (index - 1)*10 )  
            setStopIndex(index * 10);
        }
    };

    const handlePageInputChange = () => {
        if ( pageInput.current.value > 0 && pageInput.current.value <= Math.ceil(props.rows.length / 10)  ) {
            setStartIndex( (pageInput.current.value - 1)*10 );
            setStopIndex( (pageInput.current.value)*10 );
        }
    };

    const handleRegNoSearch = (e) => {
        setSearchValue(e.currentTarget.value);
    };

    useEffect(() => {
        console.log(props.rows)
        if (debouncedValue === "") {
            filteredRows.setValue(props.rows.slice(startIndex, stopIndex));
        }
        else {
            filteredRows.setValue( props.rows.filter((row) => row.regNo.includes(debouncedValue) ) )
        }
    }, [debouncedValue])

    useEffect(() => {
        console.log(startIndex)
        console.log(stopIndex)
        console.log("------------------")
        if ( Math.ceil(props.rows.length / 10) >= 8 ) {
            pageInput.current.value = stopIndex / 10;
            // Yes, I know this is pointless. pageInput.current?.value suddenly doesn't work for some unknown reason.
            // Optional chaining isn't enabled? But it was working before. I don't know what's happening.
        }
        filteredRows.setValue( props.rows.slice(startIndex, stopIndex) );

    }, [startIndex, stopIndex]);

    useEffect(() => {
        console.log("%c------------------------ Custom Table ---------------", "color: red")
        console.log("Headers: --------------------------------------------")
        console.log(props.headers)
        console.log("Rows: --------------------------------------------")
        console.log(props.rows);
        props.rows.map((row, index) => {
            row["rank"] = index + 1;
        });
        console.log(filteredRows.value);
        console.log("---------------------------------------------------")
    }, [])

    return (

        <div className="customTable">

            <div className="searchBarContainer">
                <input type="text" className="searchBar" placeholder="Enter register number to search..." onChange={handleRegNoSearch} />
            </div>

            <div className="headers">
                {
                    props.headers.map((header) => {
                        return ( <div className={`header ${header}`} >{  (props.headersNoModify) ? header : headerMap[header]  } </div> )
                    })
                }
            </div>

            <div className="rows">
                {
                    (filteredRows.value.length > 0) ? (
                        filteredRows.value?.map((row, index) => {
                            return (
                                <div className={"row " + ((index % 2 == 0) ? "even" : "odd")}>
                                    {
                                        props.headers.map((header) => {
                                            return <div className="regNo" key={header}>
                                                {row[header]}
                                            </div>
                                        })
                                    }
                                </div>
                            )                        
                        })
                    ) : (
                        <div className="row">
                            <div className="regNo">No matches found.</div>
                        </div>
                    )
                    
                }
            </div>

            <div className="pagination">
                {
                    ( Math.ceil(props.rows.length / 10) < 8 ) ? (
                        new Array( Math.ceil(props.rows.length / 10) ).fill(0).map((val, index) => <button key={index} className={(((startIndex / 10) ) == index) ? "active" : ""} onClick={() => goToPage(index)}>{index + 1}</button> )
                    ) : (
                        <>
                            <button disabled={ (startIndex === 0) } onClick={ () => {
                                if (startIndex !== 0) {
                                    setStopIndex( (stopIndex) => stopIndex - 10 );
                                    setStartIndex( (startIndex) => startIndex - 10 );
                                }

                            } } >{"<"}</button>
                            <button className={ (startIndex === 0) ? "active" : "" } onClick={() => goToPage(0)}>1</button>  
                            <button className={ (startIndex === 10) ? "active" : "" } onClick={() => goToPage(1)}>2</button>  
                            <div>...</div>
                            <button className={ (stopIndex === (Math.ceil(props.rows.length / 10) * 10)-10 ) ? "active" : "" } onClick={() => goToPage(Math.ceil(props.rows.length / 10) - 2)}>{Math.ceil(props.rows.length / 10) - 1}</button>  
                            <button className={ (stopIndex === (Math.ceil(props.rows.length / 10) * 10) ) ? "active" : "" } onClick={() => goToPage(Math.ceil(props.rows.length / 10) - 1)}>{Math.ceil(props.rows.length / 10)}</button> 
                            <button disabled={ (stopIndex === (Math.ceil(props.rows.length / 10) * 10)) } onClick={ () => {
                                if (stopIndex !== (Math.ceil(props.rows.length / 10) * 10)) {
                                    setStopIndex( (stopIndex) => stopIndex + 10 );
                                    setStartIndex( (startIndex) => startIndex + 10 );
                                }

                            } }  >{">"} </button>

                            <input ref={pageInput} 
                                type="number" 
                                onChange={handlePageInputChange} 
                                min={1} 
                                max={Math.ceil(props.rows.length / 10)} 
                            />
                        </>
                    )
                }
            </div>
        </div>

    )
} 