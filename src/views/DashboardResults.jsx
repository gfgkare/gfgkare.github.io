import "../styles/DashboardResults.scss";

import CustomTable from "../components/CustomTable";

import { IoIosLock } from "react-icons/io";
import { useEffect } from "react";

import algo25Top from "../data/algo25Top";

import algo25Round2 from "@/data/algo25Round2";

import axios from "../scripts/axiosConfig";

import { useAuth } from "../contexts/AuthContext";
import useArray from "../hooks/useArray";

export default function DashboardResults(props) {
    const { currentUser } = useAuth();

    const day1Results = useArray([]);
    const day2Results = useArray([]);
    const day3Results = useArray([]);
    const day4Results = useArray([]);

    const round2Results = useArray([]);

    const round3Results = [
        {
            teamNumber: 15,
            teamMarks: 94,
            teamMembers: [
                {
                    name: "YARABOTHULA SRIYA 2021-CSEUG BATCH",
                    regNo: 99210041308,
                },
                {
                    name: "PAIDIMARRI NITHISH 2021-CSEUG BATCH",
                    regNo: 9921004522,
                },
            ],
            teamPosition: 1,
        },
        {
            teamNumber: 8,
            teamMarks: 87,
            teamMembers: [
                {
                    name: "MENTHEM POORNESH REDDY 2021-CSEUG BATCH",
                    regNo: 99210041081,
                },
                { name: "Narala Ramesh", regNo: 99210042147 },
                {
                    name: "NALLAMALLI VENKATA RAM TEJA 2022-CSE",
                    regNo: 99220041976,
                },
                { name: "Neeraj Yadav", regNo: 9921004802 },
            ],
            teamPosition: 2,
        },
        {
            teamNumber: 23,
            teamMarks: 85,
            teamMembers: [
                { name: "VANGALA BHARATH REDDY", regNo: 9921004990 },
                {
                    name: "PIDIGUNDLA VENKATESWARA RAO 2022-CSE",
                    regNo: 99220040688,
                },
                { name: "SACHIN SAHADEV SINGH", regNo: 9210041113 },
                { name: "SHAIK MOHAMMAD GOUSE", regNo: 99210042156 },
            ],
            teamPosition: 3,
        },
        {
            teamNumber: 7,
            teamMarks: 83,
            teamMembers: [
                { name: "SAI VARDHAN PENMETSA", regNo: 9921004954 },
                { name: "SEELAM MOHAN KRISHNA", regNo: 99210041956 },
                { name: "Maruthi Navadeep Marella", regNo: 99220041253 },
                { name: "MAHA SRI. B", regNo: 99220041631 },
            ],
            teamPosition: 4,
        },
        {
            teamNumber: 19,
            teamMarks: 77,
            teamMembers: [
                {
                    name: "BHARGAV BALARAM RAMANUJAKUTAM 2022-CSE",
                    regNo: 99220040809,
                },
                { name: "DEVANGA AMBE USHA", regNo: 99210041979 },
                { name: "TANGUDU AAKASH", regNo: 99210042158 },
                { name: "GARNEPUDI PRASANTHI", regNo: 99220040516 },
            ],
            teamPosition: 5,
        },
        {
            teamNumber: 13,
            teamMarks: 75,
            teamMembers: [
                { name: "MITHINTI ANUJA 2021-CSE BATCH", regNo: 99210041399 },
                { name: "POTTHURI AKSHITHA", regNo: 9921004582 },
                { name: "S. VENU MADHAV REDDY", regNo: 99210041910 },
                { name: "YOGAVIGNESH R 2022-CSE", regNo: 99220042058 },
            ],
            teamPosition: 6,
        },
        {
            teamNumber: 14,
            teamMarks: 72,
            teamMembers: [
                { name: "MACHIREDDY DHAMINI", regNo: 9921004910 },
                { name: "TUMMALA MOHAN ADITYA", regNo: 99220041400 },
            ],
            teamPosition: 7,
        },
        {
            teamNumber: 1,
            teamMarks: 70,
            teamMembers: [
                { name: "Kovi Venkata Keerthi", regNo: 99210041814 },
                { name: "CHIDURA SREENIDHI", regNo: 9921004138 },
                { name: "YELLA SIRI CHOWDARY 2022-CSE", regNo: 99220041036 },
                { name: "NOORA HARISH", regNo: 99210042002 },
            ],
            teamPosition: 8,
        },
        {
            teamNumber: 21,
            teamMarks: 70,
            teamMembers: [
                { name: "K Devisree", regNo: 99210041872 },
                {
                    name: "MANDAPPAGARI THULASI KUMAR 2021-CSE BATCH",
                    regNo: 99210041471,
                },
                { name: "PRAVEEN KUMAR S 2021-CSE UG", regNo: 99210042006 },
                { name: "MD SHAHID ALAM", regNo: 99210041232 },
            ],
            teamPosition: 9,
        },
        {
            teamNumber: 24,
            teamMarks: 69,
            teamMembers: [
                { name: "BRUNDAVANAM SUREKHA 2021-CSE", regNo: 98220040005 },
                { name: "Kasala Abhinav", regNo: 99220040572 },
            ],
            teamPosition: 10,
        },
        {
            teamNumber: 10,
            teamMarks: 65,
            teamMembers: [
                { name: "DANTHALA AASHRITHA 2022-CSE", regNo: 99220040481 },
                { name: "AMRIT RAJ", regNo: 99210041136 },
            ],
            teamPosition: 11,
        },
        {
            teamNumber: 3,
            teamMarks: 64,
            teamMembers: [
                { name: "AMARA NAVANEETHA", regNo: 99210041835 },
                { name: "JONNALAGADDA NIHIT 2022-CSE", regNo: 99220040551 },
                { name: "Md Ashraf ali", regNo: 99210042287 },
            ],
            teamPosition: 12,
        },
        {
            teamNumber: 6,
            teamMarks: 62,
            teamMembers: [
                { name: "BOLLA KARTHIK TARAKA SAI", regNo: 99210041518 },
                { name: "MuraliDharan", regNo: 9922008051 },
                {
                    name: "ANTHATI YATHEESH 2021-CSEUG BATCH",
                    regNo: 99210041006,
                },
                { name: "SIRIGUPPA SAI YESWANTH", regNo: 9921004975 },
            ],
            teamPosition: 13,
        },
        {
            teamNumber: 12,
            teamMarks: 62,
            teamMembers: [
                { name: "Hitesh Kumar Kothapalli", regNo: 99220040586 },
                { name: "Elambharati E", regNo: 99220041877 },
            ],
            teamPosition: 14,
        },
        {
            teamNumber: 20,
            teamMarks: 61,
            teamMembers: [
                { name: "Batta Malleswari", regNo: 9921004079 },
                { name: "Ravi Raj Singh", regNo: 99220040182 },
                { name: "KARNATAKAM ANVITHA", regNo: 9921004326 },
            ],
            teamPosition: 15,
        },
        {
            teamNumber: 2,
            teamMarks: 58,
            teamMembers: [
                { name: "ANNAM HEMANTH KUMAR 2022-CSE", regNo: 99220041106 },
                { name: "DASAYYA REVANTH 2022-CSE", regNo: 99220041894 },
                { name: "SRUNGARAPU JAGADEESWARI DEVI", regNo: 99220041577 },
                {
                    name: "PANTHAM SIVAMANI 2021-CSEUG BATCH",
                    regNo: 99210041614,
                },
            ],
            teamPosition: 16,
        },
        {
            teamNumber: 22,
            teamMarks: 58,
            teamMembers: [
                { name: "THARUN KUMAAR U", regNo: 99220041777 },
                { name: "Manju Vallabha Pavalla", regNo: 99210041261 },
                { name: "PENDYALA SAI KUMAR 2021-CSEUG", regNo: 9921004953 },
                { name: "Sujith Gopi", regNo: 99220041389 },
            ],
            teamPosition: 17,
        },
        {
            teamNumber: 5,
            teamMarks: 57,
            teamMembers: [
                { name: "BOYA PRANAVI", regNo: 9921004107 },
                { name: "ARIGELA HEMA KUMAR 2022-CSE", regNo: 99220041623 },
                { name: "DHATSHINAMOORTHY R", regNo: 99220041895 },
                { name: "VIBHUTHI VISHWARADHYA 2022-CSE", regNo: 99220040772 },
            ],
            teamPosition: 18,
        },
        {
            teamNumber: 11,
            teamMarks: 57,
            teamMembers: [
                {
                    name: "JAKKU VEERA JAGADESWAR REDDY 2022-CSE",
                    regNo: 99220041489,
                },
                { name: "JAIANANDAKRISHNAA K 2021-CSE UG", regNo: 99210041790 },
                { name: "ATTULURI NEHA 2021-CSE UG", regNo: 99210041838 },
            ],
            teamPosition: 19,
        },
        {
            teamNumber: 16,
            teamMarks: 50,
            teamMembers: [
                { name: "Prashant Kumar", regNo: 99210041621 },
                {
                    name: "KARANAM SAI SHARAN 2021-CSEUG BATCH",
                    regNo: 99210041051,
                },
                { name: "BURRAMSETTY VENKATA SAI RUKMINI", regNo: 9921004846 },
                {
                    name: "MUTHALURU SRINADH 2021-CSEUG BATCH",
                    regNo: 9921004477,
                },
            ],
            teamPosition: 20,
        },
        {
            teamNumber: 18,
            teamMarks: 50,
            teamMembers: [
                { name: "K YASHAS", regNo: 9921004788 },
                { name: "MUNAGALA ANIL", regNo: 9921004469 },
                { name: "DUDEKULA SANA HOMERA", regNo: 9921004189 },
                { name: "MANASA A 2021CSE UG BATCH", regNo: 99210041727 },
            ],
            teamPosition: 21,
        },
        {
            teamNumber: 4,
            teamMarks: 48,
            teamMembers: [
                { name: "NAGAVETI VAMSI SAI 2021-CSE", regNo: 99210042206 },
                { name: "PALLE VARSHITH 2021-CSEUG BATCH", regNo: 9921004528 },
                {
                    name: "SESHAMSETTI GOWRI SHANKAR 2022-CSE",
                    regNo: 99220040727,
                },
            ],
            teamPosition: 22,
        },
        {
            teamNumber: 17,
            teamMarks: 45,
            teamMembers: [
                { name: "SURESH KUMAR G", regNo: 99220041851 },
                {
                    name: "ULICHI BHANU PRASAD 2021-CSEUG BATCH",
                    regNo: 9921004734,
                },
                { name: "B.sai teja", regNo: 99210042267 },
                { name: "DAMULURI HARIKA 2021-CSE", regNo: 99210042196 },
            ],
            teamPosition: 23,
        },
        {
            teamNumber: 9,
            teamMarks: 36,
            teamMembers: [
                { name: "Aitha Veera Naga Riyesh", regNo: 9921004014 },
                {
                    name: "PAKAM DIVYA DURGA VIGNESH 2021-CSEUG BATCH",
                    regNo: 99210041610,
                },
                { name: "BHAVANAM SAMYUKTHA", regNo: 99210041015 },
            ],
            teamPosition: 24,
        },
    ];

    useEffect(() => {
        if (currentUser === "none" || !currentUser) return;
        else {
            console.log("%cGetting round 2 Data.", "color: red");
            // axios
            //     .post(
            //         "/get_round2_all_data",
            //         { eventID: "algo2025" }, //admin: "ohyes"
            //         { headers: { Authorization: `${currentUser.accessToken}` } }
            //     )
            //     .then((res) => {
                    console.log("%cGetting round 2 Data", "color: green");
                    // console.log(res.data);
                    day1Results.setValue(algo25Round2['Day1']);
                    console.log("Set Day 1 value");

                    console.log(day1Results)
                    // console.log(day1Results.value)
                    // console.log(day1Results.value.length)

                    day2Results.setValue(algo25Round2['Day2']);
                    // day3Results.setValue(res.data.dayWiseData.Day3);
                    // day4Results.setValue(res.data.dayWiseData.Day4);

                    // XLS FILE
                    round2Results.setValue(algo25Round2);
                // })
                // .catch((err) => {
                //     console.log(err);
                // });
        }
    }, [currentUser]);

    return (
        <div className="dashboardResults">
            <div className="resultBigTitle">Results</div>

            {/* <div className="title">Round 4 - Debugging</div>

            <div className="round4">
                {
                    <CustomTable 
                        headers={["rank", "regNo", "score"]}
                        rows={round4Results}
                    />
                }
            </div>

            <div className="splitter"></div>

            <div className="title">Round 3 - QnA</div>
            <div className="round3">
                <div className="teamBoxesContainer">
                    {round3Results.map((team, index) => (
                        <div className="teamBox" key={index}>
                            <div className="teamPosition">
                                #{team.teamPosition}
                            </div>
                            <div className="teamNumber">
                                Team {team.teamNumber}
                            </div>
                            <div className="teamDetails">
                                <div className="teamMarks">
                                    <div className="teamMarksTitle">Scored</div>
                                    <div className="marks">
                                        {team.teamMarks}/100
                                    </div>
                                </div>
                                <div className="teamBoxMembers">
                                    <div className="teamMembersTitle">
                                        Members
                                    </div>
                                    {team.teamMembers.map((member, index) => (
                                        <div className="member" key={index}>
                                            <div className="name">
                                                {member.name}
                                            </div>
                                            <div className="regNo">
                                                {member.regNo}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="splitter"></div> */}

            <div className="title">Round 2 - Seminar</div>
            <div className="round2Best">
                {round2Results.value.length > 0 ? (
                    <CustomTable
                        headers={[
                            "rank",
                            "regNo",
                            "explanation",
                            "complexity",
                            "realtime",
                            "viva",
                            "overallMarks",
                        ]}
                        rows={round2Results.value.sort((a, b) => b.overallMarks - a.overallMarks)}
                    />
                ) : (
                    <></>
                )}
            </div>

            <div className="splitter"></div>

            <div className="title">Round 1 - Quiz</div>
            <CustomTable
                headers={[
                    "rank",
                    "regNo",
                    "section1",
                    "section2",
                    "section3",
                    "overallMarks",
                ]}
                rows={algo25Top}
            />

            <div className="splitter"></div>

            <div className="title">
                Round 3 - Q&A <IoIosLock size={"25px"} />
            </div>

            <div className="splitter"></div>

            <div className="title">
                Round 4 - Debugging <IoIosLock size={"25px"} />
            </div>

            <div className="splitter"></div>

            <div className="title round5">
                Round 5 - Coding <IoIosLock size={"25px"} />
            </div>

            <div className="splitter"></div>
        </div>
    );
}
