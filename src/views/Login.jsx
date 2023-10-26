
import { useAuth } from "../contexts/AuthContext";


export default function Login() {


    const { signinwithpopup } = useAuth();

    return (

        <div className="loginPage">
            <button onClick={() => signinwithpopup("google")}>Sign In with Google</button>
        </div>

    )
}