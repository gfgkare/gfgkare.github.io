import "../styles/Footer.scss";

import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai"


export default function Footer(props) {


    return (
        <div className="connect" style={{ backgroundColor: props.bgColor }}>
            <div className="chapterName">
                <div className="gfgkare">
                    {["G", "F", "G", "   ", "K", "A", "R", "E"].map(
                        (letter) => (
                            <div>{letter}</div>
                        )
                    )}
                </div>
                <div className="sc">
                    {[
                        "S",
                        "T",
                        "U",
                        "D",
                        "E",
                        "N",
                        "T",
                        " ",
                        "C",
                        "H",
                        "A",
                        "P",
                        "T",
                        "E",
                        "R",
                    ].map((letter) => (
                        <div>{letter}</div>
                    ))}
                </div>
            </div>

            <div className="links">
                <div className="header">CONNECT WITH US</div>
                <div className="icons">
                    <a href="https://www.instagram.com/gfgkare">
                        <AiFillInstagram size={"30px"} />
                    </a>
                    <a href="https://www.linkedin.com/company/gfg-kare-student-chapter" target="_blank">
                        <AiFillLinkedin size={"30px"} />
                    </a>
                    <a href="https://www.github.com/gfgkare" target="_blank">
                        <AiFillGithub size={"30px"} />
                    </a>
                    {/* <a href="https://www." target="_blank">
                        <AiOutlineWhatsApp size={"30px"} />
                    </a> */}
                </div>
            </div>
        </div>
    )
}