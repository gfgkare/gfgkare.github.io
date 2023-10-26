import { useAuth } from "../contexts/AuthContext"
import "../styles/Profile.scss";

export default function Profile() {

    const {USER_PRESENT, currentUser, signout } = useAuth();

    return (
        <div className="profile">

            <div className="profileBox">

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
                            You are not logged in. Please login to continue.
                        </div>
                }

            </div>

        </div>
    )
}