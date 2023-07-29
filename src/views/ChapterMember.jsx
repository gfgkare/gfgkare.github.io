import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { BsGlobe, BsStackOverflow } from "react-icons/bs";

import "../styles/ChapterMember.scss";
import ShapesBackground from "../components/ShapesBackground";

// import chapterMembersInfo from "../data/chapterMembersInfo";
import headShot from "../assets/headshot.jpg";

export default function ChapterMember(props) {
    const chapterMemberLinks = useRef();
    // const chapterMemberDiv = useRef();
    const params = useParams();
    // const [memberDetails, setMemberDetails] = useState();

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    useEffect(() => {
        console.log(props);
        // setMemberName(params.memberId || "101");

        // setMemberDetails(chapterMembersInfo.get(params.memberId));

        const teamLinkObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                chapterMemberLinks.current.classList.add("visible");
                teamLinkObserver.unobserve(chapterMemberLinks.current);
            }
        });

        teamLinkObserver.observe(chapterMemberLinks.current);
        const x = setTimeout(() => {
            document.querySelector(".chapterMember").classList.add("visible");
            clearTimeout(x);
        }, 50);

        return () => {
            teamLinkObserver.disconnect();
        };
    }, []);

    return (
        <>
            <ShapesBackground />

            <div className="chapterMember">
                <img className="chapterMemberImage" src={headShot} />

                <div className="chapterMemberDetails">
                    <div className="chapterMemberTopDetails">
                        <div className="sectionTitle chapterMemberName">
                            {toTitleCase(props.info.Name)}
                        </div>
                        <div className="chapterMemberRole">
                            {/* {props.info.role} - */}
                            {"Student Member - "}
                            {/* <span className="yearAndDept">{props.info.year} / {props.info.department}</span> */}
                            <span className="yearAndDept">
                                {props.info.Year} / {props.info.Dept}
                            </span>
                        </div>
                        <div className="chapterMemberId">
                            {/* Membership ID: {props.info.id} */}
                            Membership ID: {props.info["Membership ID"]}
                        </div>
                    </div>

                    <div className="chapterMemberAbout">
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                    </div>
                    <div
                        className="chapterMemberLinks"
                        ref={chapterMemberLinks}
                    >
                        Connect with me:{" "}
                        <AiFillLinkedin className="linkIcon" size={"25px"} />
                        <AiFillGithub className="linkIcon" size={"25px"} />
                        {/* <BsGlobe className="linkIcon" size={"25px"} /> */}
                        {/* <BsStackOverflow className="linkIcon" size={"25px"} /> */}
                        {/* <AiFillYoutube className="linkIcon" size={"25px"} /> */}
                    </div>
                </div>
            </div>
        </>
    );
}
