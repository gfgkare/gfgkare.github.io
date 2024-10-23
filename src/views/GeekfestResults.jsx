
import { useEffect } from 'react';
import geekfestResults from '../data/Geekfest24';


import CustomTable from '../components/CustomTable';

import "../styles/GeekFestResults.scss"

export default function GeekfestResults() {

    useEffect(() => {
        console.log(geekfestResults);
    }, [])

    return (

        <div className="geekfestResults">
            <div className="header">
                <h1>
                    GFG KARE
                </h1>
                <h2>
                    GeekFest '24 Results
                </h2>
            </div>
            
            <CustomTable
                headers={["rank", "regNo", "score"]}
                rows={geekfestResults}
            />
        </div>
        
    )
}