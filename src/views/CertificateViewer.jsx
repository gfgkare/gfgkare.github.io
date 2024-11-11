import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function CertificateViewer() {

    const params = useParams();
    const [errored, setErrored] = useState(null);

    useEffect(() => {
        console.log(params);
        
    }, []);

    return (
        (!errored) ?
        <div className="certificateViewer">
            <img src={`/certificates/${params.certificateID}.jpg`} alt={params.certificateID} style={{ width: '100%', objectFit: "contain" }} onError={() => {
                setErrored("Not Found.")
            }} />
            <p style={{ margin: "1rem", fontWeight: 600 }}>
                This certificate is valid and is provided to {params.certificateID} for his/her active participation in Prajnotsavah by GFG KARE.
            </p>
        </div>  : (
            <p style={{ margin: "5rem", textAlign: "center", fontWeight: 600 }}>
                The certificate you requested is not found in our records.
            </p>
        )
    )    
}