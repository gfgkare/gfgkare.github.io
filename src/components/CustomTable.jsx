import { useEffect } from "react";
import useArray from "../hooks/useArray";
import "../styles/CustomTable.scss";

import { useState } from "react";


export default function CustomTable(props) {

    const [startIndex, setStartIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(10);


    const filteredRows = useArray(props.rows);

    const goToPage = (index) => {
        index++
        console.log(index);

        if (index == 1) {
            setStartIndex(0)
            setStopIndex(10)
        }
        else {
            setStartIndex( (index - 1)*10 )  
            setStopIndex(index * 10);
        }
    }

    useEffect(() => {
        filteredRows.setValue( props.rows.slice(startIndex, stopIndex) );
        console.log(`Start Index : ${startIndex}`)

        console.log(`Table has ${props.rows.length} rows`)
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
                                { row.map((cell) => <div className="cell">{cell}</div> ) }
                            </div>
                        )                        
                    })
                }
            </div>

            <div className="pagination">
                {
                    new Array( Math.ceil(props.rows.length / 10) ).fill(0).map((val, index) => <button className={(((startIndex / 10) ) == index) ? "active" : ""} onClick={() => goToPage(index)}>{index + 1}</button> )
                }
            </div>
        </div>

    )
} 