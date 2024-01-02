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

    const [ currentUser, 
        isVisible, visualsRef, celebrate, animationDone, setAnimationDone,
        resultData, setShowQualifiedPopup, setShowTimeBookPopup, setSelectedSlot,  
        booked,
        error ] = useOutletContext();


    const slotsInfo = [
        { name: "Slot 1", max: 18, algorithms: ['Boyer Moore Algorithm', 'Huffman coding', 'Z algorithm', 'Subset sum', 'Palindrome partitioning', 'Priority Queue', 'Boyer Moore Algorithm', 'Assembly line scheduling', 'Activity selection problem', 'Minimum coin change problem'] },
        { name: "Slot 2", max: 18 },
        { name: "Slot 3", max: 18 },
        { name: "Slot 4", max: 18 },
        { name: "Slot 5", max: 18 },
        { name: "Slot 6", max: 18 },
        { name: "Slot 7", max: 18 },
        { name: "Slot 8", max: 18 },
        { name: "Slot 9", max: 18 },
        { name: "Slot 10", max: 18 }

    ]

    useEffect(() => {
        const slotCountUpdater = setInterval(() => {
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
        }, 10000);
        setSlotCountInterval(slotCountUpdater)

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


    return (
        <div className="slotSelection">
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
                                        <ul className="algos">
                                            {
                                                (slot.algorithms?.map((algo) => <li className="algo">{algo}</li> ))
                                            }
                                        </ul>
                                        
                                        {
                                            (!booked) ? (
                                                <button className="bookSlot" 
                                                    disabled={ (0 > slot.max  )  } 
                                                    onClick={ () => {
                                                        setSelectedSlot(index+1);
                                                        setShowTimeBookPopup(true);
                                                    } } >
                                                Book
                                                </button>
                                            ) : (<></>)
                                        }
                                    </div>
                                </div>
                            )
                        }))
                    }
            </div>
        </div>
    )
}