import { useEffect } from "react";
import useArray from "../hooks/useArray";
import "../styles/CustomTable.scss";

import { useState, useRef } from "react";


export default function CustomTable(props) {

    const [startIndex, setStartIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(10);

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
    }

    const handlePageInputChange = () => {

        if ( pageInput.current.value > 0 && pageInput.current.value <= Math.ceil(props.rows.length / 10)  ) {
            setStartIndex( (pageInput.current.value - 1)*10 );
            setStopIndex( (pageInput.current.value)*10 );
        }

        
    }

    useEffect(() => {
        console.log(startIndex)
        console.log(stopIndex)
        console.log("------------------")
        pageInput.current.value = (stopIndex / 10)
        filteredRows.setValue( props.rows.slice(startIndex, stopIndex) );

    }, [startIndex, stopIndex])

    return (

        <div className="customTable">
            <div className="headers">
                {
                    props.headers.map((header) => {
                        return ( <div className="header" >{header} </div> )
                    })
                }
            </div>

            <div className="rows">
                {
                    filteredRows.value.map((row, index) => {
                        return (
                            <div className={"row " + ((index % 2 == 0) ? "even" : "odd")}>
                                <div className="regNo">{row.userData.regNo}</div>
                                <div className="regNo">{row.userData.section1.totalMarks}</div>
                                <div className="regNo">{row.userData.section2.totalMarks}</div>
                                <div className="regNo">{row.userData.section3.totalMarks}</div>
                                <div className="regNo">{row.userData.overallMarks}</div>
                                <div className="regNo">{ parseInt((row.userData.overallMarks / 90) * 100) }%</div>
                                
                            </div>
                        )                        
                    })
                }
            </div>

            <div className="pagination">
                {
                    ( Math.ceil(props.rows.length / 10) < 8 ) ? (
                        new Array( Math.ceil(props.rows.length / 10) ).fill(0).map((val, index) => <button className={(((startIndex / 10) ) == index) ? "active" : ""} onClick={() => goToPage(index)}>{index + 1}</button> )
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