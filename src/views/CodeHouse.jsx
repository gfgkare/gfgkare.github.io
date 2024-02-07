import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import "../styles/CodeHouse.scss";

export default function CodeHouse() {

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        setTimeout(() => setLoadingPercentage(25), 1000);
        setTimeout(() => setLoadingPercentage(50), 2000);
        setTimeout(() => setLoadingPercentage(60), 3000);
        setTimeout(() => setLoadingPercentage(100), 5000);
        setTimeout(() => setLoadingStatus("done"), 6000);
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