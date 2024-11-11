import { useEffect } from "react";
import { useParams } from "react-router-dom"

export default function CertificateViewer() {

    const params = useParams();

    useEffect(() => {
        console.log(params);
        
    }, []);

    try {
        const image = `/certificates/${params.certificateID}.jpg`;
        return (
            <div className="certificateViewer">
                <img src={image} alt={params.certificateID} style={{ width: '100%', objectFit: "contain" }} />
                <span style={{ textAlign: "center", margin: "0 auto" }}>
                    This certificate is valid and is provided to {params.certificateID} for his/her active participation in Prajnotsavah by GFG KARE.
                </span>
            </div>
        )
        
    } catch (error) {
        console.log(error);
        
        return <p>Certificate not found</p>;
    }
}