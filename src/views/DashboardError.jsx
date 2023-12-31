import { useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function DashboardError() {

    const { signinwithpopup } = useAuth();
    
    const [
        currentUser, isVisible, visualsRef, celebrate, animationDone, setAnimationDone, resultData, setShowQualifiedPopup, error ] = useOutletContext();


    return (

        <div className="error" style={ { padding: "0 1rem", display: "flex", flexDirection: "column", gap: "1rem" } }>
            {error}
            <span>
                <span style={ { maxWidth: "max-content", textDecoration: "underline", cursor: "pointer" } } onClick={() => signinwithpopup("google")}>
                    Sign In{"  "}
                </span> 
                with another account?
            </span>
        </div>
    )
}