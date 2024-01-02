import "../styles/SlotBookPopup.scss";
import { useState, useEffect } from "react";

import axios from "../scripts/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SlotBookPopup(props) {

    const [animationClass, setAnimationClass] = useState("");

    const [timingCount, setTimingCount] = useState({});

    const [timing, setTiming] = useState(null);

    useEffect(() => {
        setAnimationClass("visible");
    }, []);

    const closePopup = () => {
        setAnimationClass("closed");
        setTimeout(() => {
            props.close();
        }, 200)
    }

    const handleTimeSelect = (e) => {
        const { id } = e.target;
        setTiming(id);
    }

    useEffect(() => {
        getTimingSeats();
    }, [])

    useEffect(() => {
        const timingCountUpdater = setInterval(() => {
            getTimingSeats();
        }, 5000);

        return () => clearInterval(timingCountUpdater);
    }, [])

    const getTimingSeats = () => {
        axios.post(
            "get_timings_count", 
            { eventID: "algo2024" },  //admin: "ohyes"
            { headers: { "Authorization": `${props.currentUser.accessToken}` } })
        .then((res) => {
            setTimingCount( res.data.count )
        })
        .catch((err) => {
            console.error(err)
        });
    }

    const confirm = (e) => {
        if (!timing) return;

        let uploadObj = {}

        uploadObj["slot"] = props.selectedSlot;
        uploadObj["timing"] = timing;
        uploadObj["regNo"] = 9922008342;
        uploadObj["nameFromEmail"] = props.currentUser.displayName;
        
        axios.post(
            "/book_slot", 
            { eventID: "algo2024", admin: "ohyea", uploadObj: uploadObj },  //admin: "ohyes"
            { headers: { "Authorization": `${props.currentUser.accessToken}` } })
            .then((res) => {
                console.log(res.data);
                toast.success(res.data);
                props.onSuccessfulBook();
                closePopup();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });


    }

    return (
        <div className={"slotBookPopup"}>
            <button className="close" onClick={closePopup}>
                X
            </button>

            <div className="box">
                Select one timing under Slot {props.selectedSlot}
                <div className="radioContainer" onChange={handleTimeSelect}>
                    <span className="radio"> <label> <input type="radio" name="timingSelect" id="Jan 5" /> Jan 5 2024, 04:30PM - 06:30PM </label> <span className="seats"> {(timingCount[`Jan 5`]?.count) ?? "-"} /45 seats full</span>  </span>
                    <span className="radio"> <label> <input type="radio" name="timingSelect" id="Jan 6" /> Jan 6 2024, 04:30PM - 06:30PM </label> <span className="seats"> {(timingCount[`Jan 6`]?.count) ?? "-"} /45 seats full</span>  </span>
                    <span className="radio"> <label> <input type="radio" name="timingSelect" id="Jan 8" /> Jan 8 2024, 04:30PM - 06:30PM </label> <span className="seats"> {(timingCount[`Jan 8`]?.count) ?? "-"} /45 seats full</span>  </span>
                    <span className="radio"> <label> <input type="radio" name="timingSelect" id="Jan 9" /> Jan 9 2024, 04:30PM - 06:30PM </label> <span className="seats"> {(timingCount[`Jan 9`]?.count) ?? "-"} /45 seats full</span>  </span>
                </div>


                <button onClick={confirm}>Confirm</button>

                <sub className="note">Once selected, timing cannot be changed.</sub>
                
            </div>
            
        </div>
    )
}