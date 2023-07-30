import "../styles/MemberPreview.scss";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useMisc } from "../contexts/MiscContext";

export default function MemberPreview({ info }) {
    const { toTitleCase } = useMisc();

    const [animationClass, setAnimationClass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setAnimationClass("visible");
        }, 100);
    });

    return (
        <>
            <div className={`memberDiv` + " " + animationClass}>
                <div className="memberDivWrapper">
                    <div className="nameAndId">
                        <div className="name">{toTitleCase(info["Name"])}</div>
                        <div className="id">{info["Membership ID"]}</div>
                    </div>

                    <span
                        className="visitButton"
                        onClick={() =>
                            navigate(`/members/${info["Membership ID"]}`)
                        }
                    >
                        Visit
                    </span>
                </div>
            </div>
        </>
    );
}
