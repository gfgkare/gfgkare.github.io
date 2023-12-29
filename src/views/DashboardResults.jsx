import "../styles/DashboardResults.scss";

import CustomTable from "../components/CustomTable"

import { IoIosLock } from "react-icons/io";

import algo24Top from "../data/algo24Top";

export default function DashboardResults(props) {


    
    const tableRows = [
        [ 1, "Grace", 48, "27%" ],
        [ 2, "Eva", 24, "67%" ],
        [ 3, "Eva", 67, "7%" ],
        [ 4, "David", 58, "6%" ],
        [ 5, "Arish", 42, "96%" ],
        [ 6, "David", 53, "80%" ],
        [ 7, "Charlie", 67, "55%" ],
        [ 8, "Charlie", 32, "6%" ],
        [ 9, "Arish", 66, "98%" ],
        [ 10, "Jesse", 61, "33%" ],
        [ 11, "Charlie", 26, "99%" ],
        [ 12, "David", 28, "35%" ],
        [ 13, "Arish", 47, "54%" ],
        [ 14, "Grace", 36, "21%" ],
        [ 15, "Grace", 49, "7%" ],
        [ 16, "Bob", 26, "65%" ],
        [ 17, "Grace", 56, "1%" ],
        [ 18, "Alice", 59, "71%" ],
        [ 19, "Jesse", 30, "64%" ],
        [ 20, "David", 50, "16%" ],
        [ 21, "Eva", 62, "92%" ],
        [ 22, "Grace", 34, "35%" ],
        [ 23, "Eva", 62, "91%" ],
        [ 24, "Frank", 34, "78%" ],
        [ 25, "David", 65, "58%" ],
        [ 26, "Eva", 22, "95%" ],
        [ 27, "Alice", 28, "69%" ],
        [ 28, "Bob", 47, "95%" ],
        [ 29, "Eva", 28, "54%" ],
        [ 30, "David", 37, "34%" ],
        [ 31, "Arish", 36, "13%" ],
        [ 32, "Frank", 50, "9%" ],
        [ 33, "David", 20, "12%" ],
        [ 34, "Arish", 55, "77%" ],
        [ 35, "Grace", 26, "41%" ],
        [ 36, "David", 43, "16%" ],
        [ 37, "Arish", 20, "59%" ],
        [ 38, "David", 21, "1%" ],
        [ 39, "Jesse", 44, "32%" ],
        [ 40, "Sabari", 22, "42%" ],
        [ 41, "Arish", 46, "19%" ],
        [ 42, "Arish", 35, "61%" ],
        [ 43, "Frank", 39, "44%" ],
        [ 44, "Jesse", 54, "78%" ],
        [ 45, "David", 24, "16%" ],
        [ 46, "Bob", 57, "50%" ],
        [ 47, "Arish", 25, "11%" ],
        [ 48, "Grace", 63, "43%" ],
        [ 49, "Jesse", 59, "54%" ],
        [ 50, "Jesse", 26, "95%" ],
        [ 51, "Alice", 53, "39%" ],
        [ 52, "Bob", 61, "85%" ],
        [ 53, "Charlie", 58, "38%" ],
        [ 54, "Charlie", 37, "21%" ],
        [ 55, "Jesse", 26, "78%" ],
        [ 56, "Alice", 62, "30%" ]
    ]


    return (
        <div className="dashboardResults">
                <div className="resultBigTitle">Results</div>
                <div className="title">Round 1 - Quiz</div>
                <CustomTable headers={["Register No", "Section 1 Marks", "Section 2 Marks", "Section 3 Marks", "Total Marks", "Percentage"]} rows={algo24Top} />

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