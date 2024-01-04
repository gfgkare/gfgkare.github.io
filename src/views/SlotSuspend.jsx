import { useAuth } from "../contexts/AuthContext"
import "../styles/SlotSuspend.scss";

export default function SlotSuspend() {

    const { currentUser, USER_PRESENT } = useAuth();

    return (
        <div className="slotSelection">
            Slot Booking has ended.
        </div>
    )
}