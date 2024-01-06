import { Link, useNavigate } from "react-router-dom";



export default function EventInstructions() {

    const navigate = useNavigate();

    return (
        <div className="eventInstructions">
            Event name will be taken from query param. Fetch data from database and will be shown here.

            <Link to="/code" role="button"> Let's Go!</Link>
            
        </div>
    )
}