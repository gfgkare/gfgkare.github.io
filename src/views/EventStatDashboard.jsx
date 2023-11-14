import "../styles/EventStatDashboard.scss";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import axios from "../scripts/axiosConfig";
import { useState } from "react";


export default function EventStatDashboard() {
    const { currentUser, USER_PRESENT } = useAuth();
    const [regStatus, setRegStatus] = useState("...");

    useEffect(() => {
        if (USER_PRESENT()) {
            axios.post("/get_event_reg_status", { userID: currentUser.uid, eventID: "algo2024" }).then((res) =>  setRegStatus( (res.data.status === "Registered") ? "Waiting" : "Not Registered" )  )
        }
    }, [currentUser])


    return (
        <div className="eventStatDashboard">
            {USER_PRESENT() ? (
                <>
                    <div className="title">Upcoming Events</div>

                    <div className="eventBox">
                        <div className="eventName">Algorithmist2024</div>
                        <div className="status">{regStatus}</div>
                    </div>
                </>
            ) : (
                <div className="noUser">Sign in to view dashboard.</div>
            )}
        </div>
    );
}
