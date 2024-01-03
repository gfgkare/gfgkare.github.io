import "../styles/SlotSelection.scss"
import {useEffect, useState} from "react";
import { useOutletContext } from 'react-router-dom';

import { FaAngleDown, FaCheck } from "react-icons/fa";


import axios from "../scripts/axiosConfig";


export default function SlotSelection() {
    
    const [activeRound, setActiveRound] = useState(1);


    const [slotCountInterval, setSlotCountInterval] = useState(null);

    const [slotCount, setSlotCount] = useState({});
    const [bookedDetails, setBookedDetails] = useState({});

    const [qualifiedForSlotBooking, setQualifiedForSlotBooking] = useState();

    const { currentUser, 
        resultData, setShowTimeBookPopup, setSelectedSlot,  
        booked, setBooked,
        error } = useOutletContext();


    const slotsInfo = [
        { name: "Slot 1", max: 18, algorithms: ['Boyer Moore Algorithm', 'Huffman coding', 'Z algorithm', 'Subset sum', 'Palindrome partitioning', 'Priority Queue', 'Boyer Moore Algorithm', 'Assembly line scheduling', 'Activity selection problem', 'Minimum coin change problem'] },
        { name: "Slot 2", max: 18, algorithms: ["Edit Distance", "Edmonds-Karp algorithm", "Segment Tree", "Priority Queue", "Longest Path in a Directed Acyclic Graph", "Prim's algorithm", "Fenwick Tree", "Karatsuba Algorithm", "Maximum Subarray Sum", "Traveling Salesman Problem (TSP)"] },
        { name: "Slot 3", max: 18, algorithms: ["Longest Common Prefix", "A* Search Algorithm", "Tarjan's Algorithm", "Palindrome Partitioning", "Activity selection problem", "Optimal Binary Search Tree (OBST)", "Boyer Moore Algorithm", "Flood Fill Algorithm", "Suffix Tree", "Assembly Line Scheduling"]    },
        { name: "Slot 4", max: 18, algorithms: ["Sequence Alignment", "Kosaraju's Algorithm", "Topological sort algorithms", "Bin packing", "Word Wrap", "N-Queens", "Maximum Independent Set", "Job Sequencing", "Krauss Wildcard Matching Algorithm", "Suffix Array"] },
        { name: "Slot 5", max: 18, algorithms: ["Subset Sum", "Hamiltonian Circuit Problem", "Sorting Algorithms", "Maximum Subarray Sum", "AVL Tree (Adelson-Velsky and Landis Tree)", "Z Algorithm", "Hashing and Hash Tables", "Aho-Corasick Algorithm", "Knuth-Morris-Pratt Algorithm", "Huffman coding"] },
        { name: "Slot 6", max: 18, algorithms: ["Segment Tree", "Bellman-Ford algorithm", "Knapsack Problem", "Priority Queue", "Longest Path in a Directed Acyclic Graph", "Tarjan's Algorithm", "Prim's algorithm", "Karatsuba Algorithm", "Fenwick Tree", "Palindrome Partitioning"] },
        { name: "Slot 7", max: 18, algorithms: ["Activity selection problem", "Optimal Binary Search Tree (OBST)", "Boyer Moore Algorithm", "Flood Fill Algorithm", "Suffix Tree", "Assembly Line Scheduling", "Kosaraju's Algorithm", "Topological sort algorithms", "Bin packing", "Word Wrap"] },
        { name: "Slot 8", max: 18, algorithms: ["N-Queens", "Maximum Independent Set", "Job Sequencing", "Krauss Wildcard Matching Algorithm", "Suffix Array", "Aho-Corasick Algorithm", "Knuth-Morris-Pratt Algorithm", "Edit Distance", "Palindrome Partitioning", "Longest Common Prefix"] },
        { name: "Slot 9", max: 18, algorithms: ["Subset Sum", "Hamiltonian Circuit Problem", "Sorting Algorithms", "Maximum Subarray Sum", "Rod Cutting", "Longest Common Subsequence", "Dijkstra's algorithm", "Huffman coding", "Ford-Fulkerson algorithm", "Edmonds-Karp algorithm"] },
        { name: "Slot 10", max: 18, algorithms: ["A* Search Algorithm", "Segment Tree", "Fenwick Tree", "Karatsuba Algorithm", "Traveling Salesman Problem (TSP)", "Prim's algorithm", "Bellman-Ford algorithm", "Hashing and Hash Tables", "AVL Tree (Adelson-Velsky and Landis Tree)", "Z Algorithm"]    }

    ]

    const getSlots = () => {
        axios.post(
            "get_slots_count", 
            { eventID: "algo2024" },
            { headers: { "Authorization": `${currentUser.accessToken}` } })
            .then((res) => {
                console.log("Getting slot count.")
                setSlotCount( res.data.count )
                console.log(
                    // (!foo && foo !== 0) 
                    ( slotCount[`Slot ${4+1}`]?.count || slotCount[`Slot ${4+1}`]?.count === 0 ) ? ( 18 - slotCount[`Slot ${4+1}`]?.count )  : "-"
                )
            })
            .catch((err) => {
                console.error(err)
        });
    }

    useEffect(() => {
        console.log("Getting slot book qual status");

        axios.post(
            "is_qualified_for_slot_booking", 
            { eventID: "algo2024" },  //admin: "ohyes"
            { headers: { "Authorization": `${currentUser.accessToken}` } })
            .then((res) => {
                console.log("Onload Getting qualified for slot booking.")
                setQualifiedForSlotBooking(res.data.qualified);
                tempQualified = res.data.qualified;
            })
            .catch((err) => {
                console.error(err);
            })
            
        console.log("Getting slots")
        getSlots();
        const slotCountUpdater = setInterval(() => {
            getSlots();
        }, 10000);
        setSlotCountInterval(slotCountUpdater)

        axios.post(
            "get_round2_booked_data", 
            { eventID: "algo2024" },  //admin: "ohyes"
            { headers: { "Authorization": `${currentUser.accessToken}` } })
            .then((res) => {
                console.log("Onload Getting book data.")
                console.log(res.data);
                setBookedDetails(res.data);
                setBooked(res.data.status === "booked")
                setActiveRound(res.data.slot)

                if (res.data.status === "boooked") {
                console.log("Onload Clearing Slot count interval.")
                    clearInterval(slotCountInterval);
                }
            })
            .catch((e) => {
                console.log("Error in getting booked stat.")
            })

        return () => clearInterval(slotCountUpdater);
    }, [])

    useEffect(() => {
        console.log(`Booked status: ${booked}`)
        if (booked) {
            console.log("Clearing Slot Count interval")
            clearInterval(slotCountInterval);

            axios.post(
                "get_round2_booked_data", 
                { eventID: "algo2024" },  //admin: "ohyes"
                { headers: { "Authorization": `${currentUser.accessToken}` } })
                .then((res) => {
                    console.log(res.data);
                    setBookedDetails(res.data);
                })
                .catch((e) => {
                    console.log("Error in getting booked stat.")
                })
        }
    }, [booked])

    useEffect(() => {
        if (!qualifiedForSlotBooking) {
            clearInterval(slotCountInterval);
        }
    }, [qualifiedForSlotBooking])


    return (
        <>
            <div className="slotSelection">

                {
                    (qualifiedForSlotBooking) ? (
                        <>
                            {
                    (bookedDetails.status === "booked") ? (
                        <div className="bookedStatus"> 
                            <FaCheck />
                            You have booked for Slot {bookedDetails.slot} on {bookedDetails.timing}, 4:30PM - 6:30PM
                        </div>
                    ) : (<></>)
                    }            
                    <div className="slotsContainer">
                        {
                                (slotsInfo.map((slot, index) => {
                                    return (
                                        <div className={"slot slot" + (index+1) + ( (activeRound === index+1) ? " active" : ""  ) } key={index}>
                                            <div className="header" onClick={() => setActiveRound( (activeRound === (index+1)) ? 0 : (index+1))}>
                                                <span>{slot.name}</span>  
                                                <span className="right">
                                                    {
                                                        (!booked) ? (
                                                            <span className="available"> 
                                                                Available Seats: { ( slotCount[`Slot ${index+1}`]?.count || slotCount[`Slot ${index+1}`]?.count === 0 ) ? ( slot.max - slotCount[`Slot ${index+1}`]?.count )  : "-"} / { slot.max }
                                                            </span>
                                                        ) : (
                                                        <></>
                                                        )
                                                    }
                                                    <FaAngleDown className="dropdown" />
                                                </span>
                                                
                                            </div>
                                            <div className="slotBody">
                                                <h3>Algorithms</h3>
                                                <ul className="algos">
                                                    {
                                                        (slot.algorithms?.map((algo, i) => <li className="algo" key={i}>{algo}</li> ))
                                                    }
                                                </ul>

                                                <div className="buttonContainer">
                                                    {
                                                        (!booked && slotCount[`Slot ${index+1}`]?.count < 18 ) ? (
                                                            <button className={("bookSlot " + (slotCount[`Slot ${index+1}`]?.count < 18) ? "lrdd" : "more" )}
                                                                disabled={ (0 > slot.max  )  } 
                                                                onClick={ () => {
                                                                    console.log(slotCount[`Slot ${index+1}`]?.count)
                                                                    console.log(slotCount[`Slot ${index+1}`]?.count < 18)
                                                                    console.log(slotCount[`Slot ${index+1}`]?.count <= 18)
                                                                    console.log(slotCount[`Slot ${index+1}`]?.count > 18)

                                                                    setSelectedSlot(index+1);
                                                                    setShowTimeBookPopup(true);
                                                                } } >
                                                                Book This Slot
                                                            </button>
                                                        ) : (<></>)
                                                    }
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                    </div>
                        </>
                    ) : <>You are not qualified for Slot Booking. Please contact us if you think is a mistake.</>
                }

            </div>
        
        </>
        
    )
}