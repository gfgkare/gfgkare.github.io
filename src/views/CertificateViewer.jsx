import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";

import Footer from "@/components/Footer";
import axios from "../scripts/axiosConfig";
import { toast } from "react-toastify";

import "../styles/CertificateViewer.scss";

export default function CertificateViewer() {
    const { eventID, certificateID } = useParams();
    const [errored, setErrored] = useState(false);
    const [loading, setLoading] = useState(true);

    const canvasRef = useRef(null);

    useEffect(() => {
        let name = '';

        // let googlesansurl = 'https://cdn.jsdelivr.net/gh/hprobotic/Google-Sans-Font/GoogleSans-Bold.ttf'
        let googlesansurl = ''

        async function loadFont(fontFamily, url) {
            const font = new FontFace(`${fontFamily}`, `url(${url})`);
            await font.load();
            document.fonts.add(font);
        }

        loadFont('Google Sans Bold', googlesansurl);

        axios.get("/certificates/" + eventID + "/" + certificateID)
        .then((res) => {
            let name = `${res.data.name} - ${certificateID}`;
            let qrSize = res.data?.qrSize || 65;

            console.log(`Placing QR code at: ${res.data.qrX}, ${res.data.qrY}`);
            console.log(`Placing name at : ${res.data.nameX}, ${res.data.nameY}`);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
        
            img.src = `/certificates/${eventID}/template.png`;
            img.onload = async () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
        
                let fontSize = res.data?.fontSize || 70;
                ctx.font = `${fontSize}px 'Google Sans'`;
                // ctx.fontWeight = '900';
                ctx.textAlign = "center";
        
                while (ctx.measureText(certificateID).width > canvas.width * 0.7) {
                    fontSize -= 4;
                    ctx.font = `${fontSize}px Arial`;
                }
        
                ctx.fillText(
                    name,
                    canvas.width / 2,
                    canvas.height - res.data.nameY
                );

                const qrUrl = `https://gfgkare.github.io${location.pathname}`;
                const qrImage = await QRCode.toDataURL(qrUrl, { scale: 10 });
                

                const qrImg = new Image();
                qrImg.src = qrImage;
                qrImg.onload = () => {
                    ctx.drawImage(qrImg, ((canvas.width / 2) + res.data.qrX), (canvas.height - res.data.qrY), qrSize, qrSize);
                };
            };
        
            img.onerror = () => setErrored(true);
            setLoading(false);
            toast.success("This certificate is valid.", {
                autoClose: 2000,
                pauseOnHover: true,
            });
        })
        .catch((err) => {
            setLoading(false);
            console.error(err);
            setErrored(true);
        });

    }, [certificateID]);

    useEffect(() => {
        console.log(`Event ID: ${eventID}, Certificate ID: ${certificateID}`);
    }, [eventID, certificateID]);

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = `GFGKARE-${eventID}-${certificateID}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <>
            {
                (loading) && (
                    <div className="loading">
                        Fetching certificate details. Please wait.
                    </div>
                )
            }
            <div className="certificateViewer" style={{ textAlign: "center", padding: "2rem" }}>
                <div className="header">
                    <div className="title">
                        Certificate Viewer
                    </div>
                </div>
                {!errored ? (
                    <>
                        <canvas ref={canvasRef} style={{ maxWidth: "70%", borderRadius: "8px" }} />
                        <button onClick={downloadCertificate}>
                            Download Certificate
                        </button>
                    </>
                ) : (
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "red", marginTop: "5rem" }}>
                        The certificate you requested was not found in our records.
                    </p>
                )}            
            </div>
            s
            <Footer />
        </>
        
    );
}