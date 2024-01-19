import "../styles/DashboardResults.scss";

import CustomTable from "../components/CustomTable"

import { IoIosLock } from "react-icons/io";
import { useEffect } from "react";

import algo24Top from "../data/algo24Top";

import axios from "../scripts/axiosConfig";

import { useAuth } from "../contexts/AuthContext"
import useArray from "../hooks/useArray";

export default function DashboardResults(props) {

    const { currentUser } = useAuth();

    const day1Results = useArray([]);
    const day2Results = useArray([]);
    const day3Results = useArray([]);
    const day4Results = useArray([]);

    const round2Results = useArray([])

    const round2Best = {
        "Day One - 05/01/24": { 
            top3: [
                { name: "Aashritha Danthala", regNo: 99220040841 }, 
                { name: "Gowri Shankar Seshamsetti", regNo: 992200410727 },
                { name: "Narala Ramesh", regNo: 99210042147 },
            ],
            results: day1Results.value            
        },
        "Day Two - 06/01/24": {
            top3: [
                { name: "Suresh Kumar G", regNo: 99220041851 }, 
                { name: "S Praveen Kumar", regNo: 99210042006 },
                { name: "Jaiananda Krishna K", regNo: 99210041790 },
            ],
            results: day2Results.value
        },
        "Day Three - 08/01/24": {
            top3: [
                { name: "Machireddy Dhamini", regNo: 9921004910 }, 
                { name: "K Yashas", regNo: 9921004788 },
                { name: "Attuluri Neha", regNo: 99210041838 },
            ],
            results: day3Results.value
        },
        "Day Four - 09/01/24": {
            top3: [
                { name: "Kovi Venkata Keerthi", regNo: 99210041814 }, 
                { name: "K Anvitha", regNo: 9921004326 },
                { name: "Jonnalagadda Nihit", regNo: 99220040551 },
            ],
            results: day4Results.value
        },
    }

    useEffect(() => {
		if (currentUser === "none" || !currentUser) return;
        else {
            console.log("%cGetting round 2 Data.", "color: red");
            axios.post(
                "/get_round2_all_data", 
                { eventID: "algo2024" },  //admin: "ohyes"
                { headers: { "Authorization": `${currentUser.accessToken}` } })
                .then((res) => {
                    // console.log("%cGetting round 2 Data", "color: green");
                    // console.log(res.data.result);
                    // console.log(res.data);
                    // day1Results.setValue(res.data.dayWiseData.Day1);
                    // console.log("Set Day 1 value");

                    // console.log(day1Results)
                    // console.log(day1Results.value)
                    // console.log(day1Results.value.length)

                    // day2Results.setValue(res.data.dayWiseData.Day2);
                    // day3Results.setValue(res.data.dayWiseData.Day3);
                    // day4Results.setValue(res.data.dayWiseData.Day4);
                    
                    // XLS FILE
                    round2Results.setValue(res.data.result)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [currentUser])

    return (
        <div className="dashboardResults">
            <div className="resultBigTitle">Results</div>
            <div className="title">Round 1 - Quiz</div>
            <CustomTable 
                headers={["rank","regNo", "section1", "section2", "section3", "overallMarks", "completionTime"]} 
                rows={algo24Top} />

            <div className="splitter"></div>

            <div className="title">Round 2 - Seminar</div>
            <div className="round2Best">
                {/* {Object.keys(round2Best).map((key) => (
                    <>
                    
                        <div className="day" key={key}>
                            <div className="dayTitle">{key}</div>
                            <div className="toppers">
                                {round2Best[key]["top3"].map((student, index) => (
                                    <span className="student" key={student.regNo}>
                                        <span className="position">#{index+1}</span>
                                        <div className="nameAndRegNo">
                                            <span className="name">{student.name}</span>
                                            <span className="regNo">{student.regNo}</span> 
                                        </div>
                                    </span>
                                ))}
                            </div>
                            
                        </div>
                        
                        {
                            (round2Best[key]["results"].length > 0) ? (
                                <>
                                    <CustomTable headers={["rank", "regNo", "explanation", "complexity", "realtime", "viva", "overallMarks"]} rows={round2Best[key]["results"]} />
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </>
                ))} */}

                {
                    (round2Results.value.length > 0) ? <CustomTable headers={["regNo", "explanation", "complexity", "realtime", "viva", "overallMarks"]} rows={round2Results.value} /> : <></> 
                }

                
            </div>

            <div className="splitter"></div>

            <div className="title">Round 3 - QnA Formation <IoIosLock size={"25px"} /> </div>

            <div className="splitter"></div>

            <div className="title">Round 4 - Debugging <IoIosLock size={"25px"} /></div>

            <div className="splitter"></div>

            <div className="title round5">Round 5 - Coding <IoIosLock size={"25px"} /></div>

            <div className="splitter"></div>
        </div>
    )
}