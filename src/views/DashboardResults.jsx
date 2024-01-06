import "../styles/DashboardResults.scss";

import CustomTable from "../components/CustomTable"

import { IoIosLock } from "react-icons/io";

import algo24Top from "../data/algo24Top";

export default function DashboardResults(props) {

    return (
        <div className="dashboardResults">
                <div className="resultBigTitle">Results</div>
                <div className="title">Round 1 - Quiz</div>
                <CustomTable headers={["Rank","Register No", "Section 1 Marks", "Section 2 Marks", "Section 3 Marks", "Total Marks", "Completion Time (mm.ss)"]} rows={algo24Top} />

                <div className="splitter"></div>

                <div className="title">Round 2 - Seminar <IoIosLock size={"25px"} /></div>

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