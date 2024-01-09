import "../styles/DashboardResults.scss";

import CustomTable from "../components/CustomTable"

import { IoIosLock } from "react-icons/io";

import algo24Top from "../data/algo24Top";

export default function DashboardResults(props) {

    const round2Best = {
        "Day One - 05/01/24": [ 
            { name: "Aashritha Danthala", regNo: 99220040841 }, 
            { name: "Gowri Shankar Seshamsetti", regNo: 992200410727 },
            { name: "Narala Ramesh", regNo: 99210042147 },
        ],
        "Day Two - 06/01/24": [
            { name: "Suresh Kumar G", regNo: 99220041851 }, 
            { name: "S Praveen Kumar", regNo: 99210042006 },
            { name: "Jaiananda Krishna K", regNo: 99210041790 },
        ],
        // "day3": [
        //     { name: "Aashritha Danthala", regNo: 99220040841 }, 
        //     { name: "Gowri Shankar Seshamsetti", regNo: 992200410727 },
        //     { name: "Narala Ramesh", regNo: 99210042147 },
        // ],
        // "day4": [
        //     { name: "Aashritha Danthala", regNo: 99220040841 }, 
        //     { name: "Gowri Shankar Seshamsetti", regNo: 992200410727 },
        //     { name: "Narala Ramesh", regNo: 99210042147 },
        // ],
    }

    return (
        <div className="dashboardResults">
            <div className="resultBigTitle">Results</div>
            <div className="title">Round 1 - Quiz</div>
            <CustomTable headers={["Rank","Register No", "Section 1 Marks", "Section 2 Marks", "Section 3 Marks", "Total Marks", "Completion Time (mm.ss)"]} rows={algo24Top} />

            <div className="splitter"></div>

            <div className="title">Round 2 - Seminar</div>
            <div className="round2Best">
                {Object.keys(round2Best).map((key) => (
                    <div className="day" key={key}>
                        <div className="dayTitle">{key}</div>
                        <div className="toppers">
                            {round2Best[key].map((student, index) => (
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
                ))}
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