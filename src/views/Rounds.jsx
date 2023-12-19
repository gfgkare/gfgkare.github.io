import Fade from "../components/Fade"
import { useEffect } from "react";

export default function Rounds() {

    useEffect(() => {
        console.log("Rounds init.");
    })

    return (

        <Fade>
            Rounds Info here.
        </Fade>

    )
}