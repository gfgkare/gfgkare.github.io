import "../styles/MemberPreview.scss";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useMisc } from "../contexts/MiscContext";

import { FiChevronRight } from "react-icons/fi";

export default function MemberPreview({ visibilityStatus, info }) {
    const { toTitleCase } = useMisc();

    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setAnimationClass("visible");
        }, 100);
    });

    return (
        <>
            <div className={`memberDiv` + " " + animationClass + " " + visibilityStatus }>
                <div className="memberDivWrapper">
                    <div className="nameAndId">
                        <div className="name">
                            {toTitleCase(info["Name"])}{" "}
                            <span>
                                {info["Year"]} / {info["Dept"]}
                            </span>{" "}
                        </div>
                        <div className="id">{info["Membership ID"]}</div>
                    </div>

                    <Link
                        to={`/members/${info["Membership ID"]}`}
                        className="visitButton"
                    >
                        <FiChevronRight size={"20px"} />
                    </Link>
                </div>
            </div>
        </>
    );
}
