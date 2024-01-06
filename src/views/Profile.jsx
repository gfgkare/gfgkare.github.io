import { useAuth } from "../contexts/AuthContext"
import { useMisc } from "../contexts/MiscContext";
import "../styles/Profile.scss";
import { Link, useLocation } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

export default function Profile() {

    const {USER_PRESENT, currentUser, signout, signinwithpopup } = useAuth();
    const { toTitleCase } = useMisc();

    const location = useLocation()

    const getPreviousPageName = (prevPath) => {
        const pathList = prevPath.split("/")
        return toTitleCase( pathList.at( pathList.length - 1 ) )

        
    }

    return (
        <div className="profile">

            <div className="profileBox" onClick={ () => console.log(location) } >
                <button className="back">
                    <Link to={location.state?.from}>
                        <IoIosArrowBack />
                        { getPreviousPageName(location.state?.from) || "Back" }
                    </Link>
                </button>

                {
                    (USER_PRESENT()) ? 
                        <div onClick={() => console.log(currentUser)}>
                            <div className="profileImage">
                                <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="user's profile image" />
                            </div>
                            <div className="profileNameAndEmail">
                                {currentUser.displayName} - {currentUser.email}
                            </div>
                            <button className="logout" onClick={signout}>
                                Sign Out
                            </button>
                        </div>
                        :
                        <div>
                            <span className="notSigned">
                                You are not logged in. Please login to continue.

                                <button onClick={() => signinwithpopup("google")}>Sign In</button>
                            </span>
                        </div>
                }

            </div>

        </div>
    )
}