import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import "../styles/CodeHouse.scss";

export default function CodeHouse() {

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        // setTimeout(() => {
            setTimeout(() => setLoadingPercentage(25), 1000);
            setTimeout(() => setLoadingPercentage(50), 1000);
            setTimeout(() => setLoadingPercentage(60), 1000);
            setTimeout(() => setLoadingPercentage(90), 1000);
            setTimeout(() => setLoadingStatus("done"), 5000);
        // }, 4000);
    }, [])

    return (

        <div className="codeHouse">

            {
                (loadingStatus === 'loading') ? (
                    <div className="loadingScreen">
                        <div className="progressBar">
                            <div className="progressBar-thumb" style={{ width: `${loadingPercentage}%` }}></div>
                        </div>
                        <div className="loadingText">
                            Loading... Get Ready!
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )
            }
            

        </div>

    )
}