
import { useEffect } from 'react';
import geekfestResults from '../data/Geekfest24';

import CustomTable from '../components/CustomTable';

export default function GeekfestResults() {

    useEffect(() => {
        console.log(geekfestResults);
    }, [])

    return (

        <div className="geekfestResults">
            geek fest results

            <CustomTable
                headers={["rank", "registerNo", "score"]}
                rows={geekfestResults}
            />
        </div>
        
    )
}